"use client";

import { Button } from "@/components/ui/button";
import db from "../utils/fireStore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BreadcrumbEllipsis } from "@/components/ui/breadcrumb";
import { EllipsisVertical } from "lucide-react";

type DeleteItemProps = {
  index: number;
};

const DeleteItem: React.FC<DeleteItemProps> = ({ index }) => {
  const handleDelete = async () => {
    const chatDocRef = doc(db, "messages", "chat1");

    try {
      const chatSnap = await getDoc(chatDocRef);
      if (chatSnap.exists()) {
        const data = chatSnap.data();
        const messages = data.messages || [];

        const updatedMessages = messages.filter(
          (_: any, i: number) => i !== index
        );

        await updateDoc(chatDocRef, { messages: updatedMessages });
        console.log("Message deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <Button variant="outline" onClick={handleDelete}>
          Delete
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeleteItem;
