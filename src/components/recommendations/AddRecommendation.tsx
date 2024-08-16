import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Plus, X } from "phosphor-react";
import { useToast } from "../ui/use-toast";
import { useCreateRecommendation } from "@/hooks/recommendation";
import SubmitLoader from "../loader/SubmitLoader";

export default function AddRecommendation() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [type, setType] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const { toast } = useToast();

  const { mutate, isPending } = useCreateRecommendation();

  const handleSubmit = () => {
    if (!title || !description || !url || !thumbnailUrl || !type || tags.length === 0) {
      toast({
        title: "Failed to add new recommendation",
        description: "Please fill in all the fields",
      });
      return;
    }

    if (tags.length > 3) {
      toast({
        title: "Failed to add new recommendation",
        description: "You can only add up to 3 tags",
      });
      return;
    }

    const recommendation = {
      title,
      description,
      url,
      thumbnailUrl,
      type,
      tags,
    };

    mutate(recommendation);
  };

  const handleAddOption = () => {
    if (!tag) {
      return;
    }

    setTags([...tags, tag]);
    setTag("");
  };

  const handleRemoveOption = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setTitle("");
    setDescription("");
    setUrl("");
    setThumbnailUrl("");
    setType("");
    setTag("");
    setTags([]);
  }, [isPending]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gray-800 mr-4 h-full border-none">Add Recommendation</Button>
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Recommendation</DialogTitle>
          <DialogDescription>
            Fill in the fields below to add a new recommendation to the list
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 ">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-4"
            />
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-4"
            />
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right" htmlFor="framework">
              Type
            </Label>
            <Select
              disabled={title === "" || description === ""}
              value={type}
              onValueChange={(e) => setType(e)}
            >
              <SelectTrigger className="col-span-4" id="framework">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent defaultChecked={false} position="popper">
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="podcast">Podcast</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              URL
            </Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="col-span-4"
            />
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="thumbnailUrl" className="text-right">
              Thumbnail
            </Label>
            <Input
              id="thumbnailUrl"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="col-span-4"
            />
          </div>

          <div className="grid grid-cols-6 items-center gap-4 mt-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <Input
              id="tags"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="col-span-4"
            />

            <div
              onClick={handleAddOption}
              className="rounded-full hover:bg-gray-100 cursor-pointer w-fit p-2"
            >
              <Plus size={22} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 my-5">
            {tags.map((i, ind) => (
              <Badge key={ind} className="py-3 text-xs  justify-evenly" variant={"outline"}>
                {i}
                <X onClick={() => handleRemoveOption(ind)} className="cursor-pointer" size={14} />
              </Badge>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="default" type="button" onClick={handleSubmit}>
            {isPending ? <SubmitLoader /> : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
