import { Blog } from "../models/Blog";

export const blogsMockResponse = (): Blog[] => [
  {
    id: "s-on9Sj",
    title: "New title 13234",
    description: "New description 123",
  },
  {
    id: "WzSLQSz",
    title: "New title 2",
    description: "New description 2",
  },
  {
    id: "ahaELtt",
    title: "New title 31",
    description:
      "The substring() method extracts the characters from a string, between two specified indices, and returns the new sub string.This method extracts the characters in a string between start and end, not including end itself.If start is greater than end, this method will swap the two arguments, meaning str.substring(1, 4) == str.substring(4, 1).If either start or end is less than 0, it is treated as if it were 0.Note: The substring() method does not change the original string.",
  },
  {
    id: "d4e2cSh",
    title: "New title",
    description: "Adding blog post",
  },
];
export const blogMockResponse = (): Blog => {
  return {
    id: "s-on9Sj",
    title: "New title 13234",
    description: "New description 123",
  };
};
export const blogCreateResponseMock = (): Blog => {
  return {
    title: "Game of thrones",
    description: "People fighting for the crown",
    id: "yRfeOFz",
  };
};
