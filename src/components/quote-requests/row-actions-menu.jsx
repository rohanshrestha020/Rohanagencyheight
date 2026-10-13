import { Eye, RotateCw, FileText, ClipboardPlus, Copy, Trash2, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Matches the Figma row menu overlay (675:22698): View details, Requote,
// Create proposal, Add quote manually, Duplicate, Delete.
function RowActionsMenu({
  onViewDetails,
  onRequote,
  onCreateProposal,
  onAddQuoteManually,
  onDuplicate,
  onDelete,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="text"
          shape="circular"
          size="icon-sm"
          className="bg-surface-highlight"
          aria-label="Row actions"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onSelect={onViewDetails}>
          <Eye className="size-4" />
          View details
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onRequote}>
          <RotateCw className="size-4" />
          Requote
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onCreateProposal}>
          <FileText className="size-4" />
          Create proposal
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onAddQuoteManually}>
          <ClipboardPlus className="size-4" />
          Add quote manually
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onDuplicate}>
          <Copy className="size-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={onDelete}>
          <Trash2 className="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { RowActionsMenu }
