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
import { Section } from "@/data/schema";
import { useUpdateSection } from "@/hooks/section";
import { forwardRef, useState } from "react";
import SubmitLoader from "../loader/SubmitLoader";

interface EditSectionProps {
  section: Section;
}

const EditSection = forwardRef<HTMLButtonElement, EditSectionProps>((props, ref) => {
  const [name, setName] = useState(props.section.name);

  const { mutate, isPending } = useUpdateSection();

  const handleSubmit = () => {
    mutate({ sectionId: props.section._id, name });
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="hidden">
        <Button ref={ref} variant="outline">
          Edit Section
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Section</DialogTitle>
          <DialogDescription>
            Make changes to the section name and click save to apply the changes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={props.section.name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
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
});

export default EditSection;
