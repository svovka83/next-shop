"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Api } from "@/shared/services/api-client";
import { IStory } from "@/shared/services/stories";
import { Container } from ".";

interface Props {
  className?: string;
}


export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);

  React.useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await Api.stories.getStories();
        setStories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStories();
  }, []);

  return (
    <>
      <Container
        className={cn(
          "flex items-center justify-between gap-2 my-10",
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-[200px] h-[250px] bg-gray-200 animate-pulse rounded-md"
            />
          ))}

        {stories.map((story) => (
          <div className="flex justify-center w-[200px] h-[250px] items-center bg-gray-200 rounded-md">
            <img
              key={story.id}
              src={story.previewImageUrl}
              width={180}
              height={180}
              className="rounded-[50%]"
            />
          </div>
        ))}
      </Container>
    </>
  );
};
