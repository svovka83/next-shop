import { Story, StoryItem } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export type IStory = Story & {
  items: StoryItem[];
};

export const getStories = async () => {
  const { data } = await axiosInstance.get<IStory[]>(ApiRoutes.STORIES);
  return data;
};
