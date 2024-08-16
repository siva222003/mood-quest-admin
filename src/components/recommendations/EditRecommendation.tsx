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
import { forwardRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Plus, X } from "phosphor-react";
import { Recommendation } from "@/data/schema";
import { useToast } from "../ui/use-toast";
import { useUpdateRecommendation } from "@/hooks/recommendation";
import SubmitLoader from "../loader/SubmitLoader";

interface EditRecommendationProps {
  recommendation: Recommendation;
}

const EditRecommendation = forwardRef<HTMLButtonElement, EditRecommendationProps>(
  ({ recommendation }, ref) => {
    const [title, setTitle] = useState(recommendation.title);
    const [description, setDescription] = useState(recommendation.description);
    const [url, setUrl] = useState(recommendation.url);
    const [thumbnailUrl, setThumbnailUrl] = useState(recommendation.thumbnailUrl);
    const [type, setType] = useState(recommendation.type);
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState<string[]>(recommendation.tags);

    const { mutate, isPending } = useUpdateRecommendation();

    const { toast } = useToast();

    const handleSubmit = () => {
      if (!title || !description || !url || !thumbnailUrl || !type || tags.length === 0) {
        toast({
          title: "Failed to Edit new recommendation",
          description: "Please fill in all the fields",
        });
        return;
      }

      if (tags.length > 3) {
        toast({
          title: "Failed to Edit new recommendation",
          description: "You can only add up to 3 tags",
        });
        return;
      }

      const newRecommendation = {
        title,
        description,
        url,
        thumbnailUrl,
        type,
        tags,
      };

      const updatedRecommendation = { ...recommendation, ...newRecommendation };

      mutate(updatedRecommendation);
    };

    const handleAddOption = () => {
      if (tag === "") {
        return;
      }

      setTags([...tags, tag]);
      setTag("");
    };

    const handleRemoveOption = (index: number) => {
      setTags(tags.filter((_, i) => i !== index));
    };

    const handleClose = () => {
      setTitle(recommendation.title);
      setDescription(recommendation.description);
      setUrl(recommendation.url);
      setThumbnailUrl(recommendation.thumbnailUrl);
      setType(recommendation.type);
      setTags(recommendation.tags);
    };

    return (
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            handleClose();
          }
        }}
      >
        <DialogTrigger asChild className="hidden">
          <Button ref={ref} variant="outline">
            Edit Recomendation
          </Button>
        </DialogTrigger>

        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Edit Recommendation</DialogTitle>
            <DialogDescription>
              Edit the recommendation details below and click save.
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
              <Select value={type} onValueChange={(e) => setType(e)}>
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
                <Badge key={ind} className="py-3 text-xs justify-evenly" variant={"outline"}>
                  {i}
                  <X onClick={() => handleRemoveOption(ind)} className="cursor-pointer" size={14} />
                </Badge>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={handleSubmit}>
              {isPending ? <SubmitLoader /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

export default EditRecommendation;
