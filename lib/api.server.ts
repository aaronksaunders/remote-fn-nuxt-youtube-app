import { db } from "./sqlite-service";

export type StuffInput = { stuff: string; important: 0 | 1 };
type Stuff = { id: number; stuff: string; important: 0 | 1 };

export const basicFunction = (value: string) => {
  return `Basic function ${value}`;
};

// ADD STUFF
export const addTheStuff = async ({ stuff, important }: StuffInput) => {

  if (!stuff || stuff.length === 0) {
    throw createError("Invalid Parameters");
  }
  
  // prepare the query
  const prep = db.prepare("INSERT INTO stuff (stuff, important)VALUES (?,?);");

  // execute the insert
  const result = prep.run(stuff, important);

  return result;
};

// GET ALL STUFF
export const getAllTheStuff = async () => {
  // prepare the query
  const prep = db.prepare("SELECT * FROM stuff;");

  // execute the insert
  const result = prep.all();

  return result as Stuff[];
};
