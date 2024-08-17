"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Api } from "@/shared/services/api-client";
import { IStory } from "@/shared/services/stories";
import { Container } from ".";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]); // відповідає за зберігання списоку stories користувача
  const [open, setOpen] = React.useState(false); // відповідає за відкриття/закриття stories
  const [selectedStory, setSelectedStory] = React.useState<IStory>(); // відповідає за обраний story

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

  const onStoryClick = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

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
          <div className="flex justify-center w-[200px] h-[250px] items-center bg-gray-200 rounded-md cursor-pointer">
            <img
              key={story.id}
              src={story.previewImageUrl}
              width={180}
              height={180}
              className="rounded-[50%]"
              onClick={() => onStoryClick(story)}
            />
          </div>
        ))}

        {open && (
          <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div className="relative" style={{ width: 520 }}>
              <button
                className="absolute -right-10 -top-5 z-30"
                onClick={() => setOpen(false)}
              >
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={3000}
                width={520}
                height={800}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
