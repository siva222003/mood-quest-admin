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
import { useCreateSection } from "@/hooks/section";
import { useEffect, useState } from "react";
import SubmitLoader from "../loader/SubmitLoader";

interface AddSectionProps {
  questionnaireId: string;
}

export default function AddSection({ questionnaireId }: AddSectionProps) {
  const [name, setName] = useState("");

  const { mutate, isPending } = useCreateSection();

  const handleSubmit = () => {
    mutate({ questionnaireId, name });
  };

  useEffect(() => {
    if (!isPending && name) {
      setName("");
    }
  }, [isPending]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gray-800 mr-4 h-full border-none">Add Section</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Section</DialogTitle>
          <DialogDescription>Add a new section to the list.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              Title
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
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
