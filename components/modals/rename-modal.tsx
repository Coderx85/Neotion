import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BiRename } from 'react-icons/bi';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { updateTitle } from '@/convex/document';

const RenameModal = ({
  id,
  documentName,
}: {
  id: Id<'documents'>;
  documentName: string;
}) => {
  const rename = useMutation(api.document.updateTitle);
  const onUpdateTitle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!id) return;
    const promise = rename({
      id,
      title: documentName,
    }).then(() => {
      toast.success('Document title updated successfully!');
    });
  };
  const [newName, setNewName] = useState(documentName);
  return (
    <DialogContent>
      <DialogTitle className="flex items-center">
        <BiRename className="w-4 h-4 mr-2" /> Rename
      </DialogTitle>
      <Input
        type="text"
        placeholder="New document name"
        className="input"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <DialogFooter>
        <Button onClick={() => rename({ id, title: newName })}>Save</Button>
        <DialogClose asChild>
          <Button className="btn" onClick={(e) => e.stopPropagation()}>
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default RenameModal;
