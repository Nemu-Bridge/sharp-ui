"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarStack } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CommandPalette,
  CommandGroup,
  CommandItem,
  CommandTab,
} from "@/components/ui/command-palette";
import { DataTable, type ColumnDef } from "@/components/ui/data-table";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Divider } from "@/components/ui/divider";
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerSection,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Dropzone } from "@/components/ui/dropzone";
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateAction,
} from "@/components/ui/empty-state";
import {
  Frame,
  FrameHeader,
  FrameTitle,
  FrameAction,
  FrameContent,
} from "@/components/ui/frame";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { KeyValue, KeyValueItem } from "@/components/ui/key-value";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { OTP } from "@/components/ui/otp";
import { Pagination } from "@/components/ui/pagination";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverBody,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Radio } from "@/components/ui/radio";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Stepper, StepperStep } from "@/components/ui/stepper";
import { Switch } from "@/components/ui/switch";
import { SwitchRow } from "@/components/ui/switch-row";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Rating } from "@/components/ui/rating";
import { Chip } from "@/components/ui/chip";
import {
  Banner,
  BannerTitle,
  BannerDescription,
  BannerAction,
} from "@/components/ui/banner";
import { CodeBlock } from "@/components/ui/code-block";

function AccordionPreview() {
  return (
    <Accordion defaultOpen={["a"]} className="w-full max-w-xs">
      <AccordionItem value="a">
        <AccordionTrigger>What is Sharp UI?</AccordionTrigger>
        <AccordionContent>
          A sharp-edged component registry for React.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Is it open source?</AccordionTrigger>
        <AccordionContent>Yes, MIT licensed.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function AlertPreview() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Alert variant="info">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>A new region is available in SYD1.</AlertDescription>
      </Alert>
      <Alert variant="danger">
        <AlertTitle>Deployment failed</AlertTitle>
        <AlertDescription>Build step exited with code 137.</AlertDescription>
      </Alert>
    </div>
  );
}

function AvatarPreview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <Avatar initials="JM" size="sm" />
        <Avatar initials="RA" />
        <Avatar initials="KP" size="lg" />
      </div>
      <AvatarStack
        avatars={[
          { initials: "JM" },
          { initials: "RA" },
          { initials: "KP" },
          { initials: "LO" },
        ]}
        max={3}
      />
    </div>
  );
}

function BadgePreview() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Badge variant="primary">Active</Badge>
      <Badge variant="success" dot>
        Online
      </Badge>
      <Badge variant="warning" dot>
        Pending
      </Badge>
      <Badge variant="destructive" dot>
        Failed
      </Badge>
      <Badge variant="secondary">Beta</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

function BreadcrumbPreview() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Workspace</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Production</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>api-edge-04</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

function ButtonPreview() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button>Deploy</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="ghost">View</Button>
      <Button loading>Saving</Button>
    </div>
  );
}

function CalendarPreview() {
  return <Calendar />;
}

function CardPreview() {
  return (
    <Card className="w-full max-w-xs p-6">
      <CardTitle>Billing details</CardTitle>
      <CardDescription>
        Update your payment method to keep services running.
      </CardDescription>
      <div className="mb-4">
        <Badge variant="warning" dot>
          Action required
        </Badge>
      </div>
      <CardFooter>
        <Button variant="ghost" size="sm">
          Later
        </Button>
        <Button size="sm">Update</Button>
      </CardFooter>
    </Card>
  );
}

function CheckboxPreview() {
  const [vals, setVals] = useState({ a: true, b: false, c: true });
  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Email notifications"
        checked={vals.a}
        onChange={(e) => setVals({ ...vals, a: e.target.checked })}
      />
      <Checkbox
        label="Weekly summary"
        checked={vals.b}
        onChange={(e) => setVals({ ...vals, b: e.target.checked })}
      />
      <Checkbox
        label="Alert on budget"
        checked={vals.c}
        onChange={(e) => setVals({ ...vals, c: e.target.checked })}
      />
      <Checkbox label="Disabled" checked disabled />
    </div>
  );
}

function CommandPalettePreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <Icon name="search" size={14} /> Open command palette
      </Button>

      <CommandPalette open={open} onClose={() => setOpen(false)}>
        <CommandTab
          label="All"
          count={4}
          itemNoun="results"
          placeholder="Search all..."
        >
          <CommandGroup label="Quick actions">
            <CommandItem
              label="Deploy server"
              icon={<Icon name="device-desktop" size={16} />}
              shortcut={["⌘", "D"]}
              onSelect={() => {}}
            />
            <CommandItem
              label="Create database"
              icon={<Icon name="database" size={16} />}
              shortcut={["⌘", "N"]}
              onSelect={() => {}}
            />
            <CommandItem
              label="Add user"
              icon={<Icon name="user-plus" size={16} />}
              shortcut={["⌘", "U"]}
              onSelect={() => {}}
            />
            <CommandItem
              label="View logs"
              icon={<Icon name="file-text" size={16} />}
              onSelect={() => {}}
            />
          </CommandGroup>
        </CommandTab>
        <CommandTab label="Actions" count={3} itemNoun="actions">
          <CommandGroup label="Deployments">
            <CommandItem
              label="Deploy to prod"
              icon={<Icon name="rocket" size={16} />}
              onSelect={() => {}}
            />
            <CommandItem
              label="Deploy to staging"
              icon={<Icon name="cloud-upload" size={16} />}
              onSelect={() => {}}
            />
          </CommandGroup>
          <CommandGroup label="Resources">
            <CommandItem
              label="Create server"
              icon={<Icon name="server" size={16} />}
              onSelect={() => {}}
            />
          </CommandGroup>
        </CommandTab>
        <CommandTab
          label="Search"
          count={1}
          itemNoun="matches"
          placeholder="Search resources..."
        >
          <CommandGroup label="Results">
            <CommandItem
              label="api-edge-04"
              meta="Server"
              onSelect={() => {}}
            />
          </CommandGroup>
        </CommandTab>
      </CommandPalette>
    </>
  );
}

type Row = { name: string; region: string; status: string };

const tableColumns: ColumnDef<Row>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 140,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  { accessorKey: "region", header: "Region", size: 80 },
  {
    accessorKey: "status",
    header: "Status",
    size: 100,
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "Online" ? "success" : "warning"}
        dot
      >
        {row.original.status}
      </Badge>
    ),
  },
];

const tableData: Row[] = [
  { name: "api-edge-01", region: "NYC1", status: "Online" },
  { name: "cache-warmer", region: "AMS3", status: "Deploying" },
  { name: "db-primary", region: "NYC1", status: "Online" },
];

function DataTablePreview() {
  return (
    <div className="w-full max-w-md">
      <DataTable columns={tableColumns} data={tableData} pageSize={3} />
    </div>
  );
}

function DateRangePickerPreview() {
  const [range, setRange] = useState<[Date, Date]>([
    new Date("2026-04-01"),
    new Date("2026-04-22"),
  ]);
  return <DateRangePicker value={range} onChange={setRange} />;
}

function DialogPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm action</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="m-0 text-[14px]">Are you sure you want to proceed?</p>
          </DialogBody>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function DividerPreview() {
  return (
    <div className="w-full max-w-xs">
      <p className="text-[14px]">Section above</p>
      <Divider />
      <p className="text-[14px]">Section below</p>
    </div>
  );
}

function DrawerPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <Icon name="settings" size={14} /> Open drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerHeader>
          <DrawerTitle>Workspace settings</DrawerTitle>
        </DrawerHeader>
        <DrawerSection>
          <SwitchRow label="Email digests" checked onChange={() => {}} />
          <SwitchRow
            label="Slack integration"
            checked={false}
            onChange={() => {}}
          />
        </DrawerSection>
      </Drawer>
    </>
  );
}

function DropdownMenuPreview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="secondary">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DropzonePreview() {
  return (
    <div className="w-full max-w-sm">
      <Dropzone />
    </div>
  );
}

function EmptyStatePreview() {
  return (
    <EmptyState>
      <EmptyStateIcon>
        <Icon name="database" size={28} />
      </EmptyStateIcon>
      <EmptyStateTitle>No databases yet</EmptyStateTitle>
      <EmptyStateDescription>
        Spin up your first managed database.
      </EmptyStateDescription>
      <EmptyStateAction>
        <Button size="sm">Create database</Button>
      </EmptyStateAction>
    </EmptyState>
  );
}

function FramePreview() {
  return (
    <div className="w-full max-w-xs">
      <Frame>
        <FrameHeader>
          <FrameTitle>Recent activity</FrameTitle>
          <FrameAction>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </FrameAction>
        </FrameHeader>
        <FrameContent>
          {[
            ["Deployed", "api-edge-09 · 2m ago"],
            ["Snapshot saved", "db-primary · 14m ago"],
          ].map(([a, b]) => (
            <div key={a} className="flex justify-between py-2 text-[13px]">
              <span className="font-medium">{a}</span>
              <span className="text-[var(--foreground-subtle)]">{b}</span>
            </div>
          ))}
        </FrameContent>
      </Frame>
    </div>
  );
}

function InputPreview() {
  const [val, setVal] = useState("jordan@studio.com");
  const [textarea, setTextarea] = useState("");
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Input
        label="Email address"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <Input
        label="API key"
        value="sk_live_invalid"
        onChange={() => {}}
        error="Key revoked or malformed"
      />
      <Input
        label="Description"
        multiline
        value={textarea}
        onChange={(e) => setTextarea(e.target.value)}
      />
    </div>
  );
}

function KeyValuePreview() {
  return (
    <div className="w-full max-w-xs">
      <KeyValue>
        <KeyValueItem label="Plan" value="Business · annual" />
        <KeyValueItem label="Region" value="New York · NYC1" />
        <KeyValueItem label="Created" value="March 14, 2024" />
        <KeyValueItem label="Owner" value="jordan@studio.com" />
      </KeyValue>
    </div>
  );
}

function MultiSelectPreview() {
  const [vals, setVals] = useState(["production", "api"]);
  return (
    <div className="w-full max-w-xs">
      <MultiSelect values={vals} onChange={setVals} placeholder="Add tags…">
        <MultiSelectOption value="production" label="production" />
        <MultiSelectOption value="staging" label="staging" />
        <MultiSelectOption value="api" label="api" />
        <MultiSelectOption value="frontend" label="frontend" />
      </MultiSelect>
    </div>
  );
}

function OTPPreview() {
  return <OTP length={6} />;
}

function PaginationPreview() {
  const [page, setPage] = useState(3);
  return (
    <Pagination currentPage={page} totalPages={7} onPageChange={setPage} />
  );
}

function PopoverPreview() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button variant="secondary">
          Filter resources <Icon name="chevron-down" size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Refine list</PopoverTitle>
        <PopoverBody>
          <p className="text-[13px] text-[var(--muted-foreground)]">
            Filter options appear here.
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function ProgressPreview() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div>
        <div className="mb-1.5 flex justify-between text-[12px] text-[var(--muted-foreground)]">
          <span>Storage used</span>
          <span className="font-mono">164 / 256 GB</span>
        </div>
        <Progress value={64} />
      </div>
      <div>
        <div className="mb-1.5 flex justify-between text-[12px] text-[var(--muted-foreground)]">
          <span>Bandwidth</span>
          <span className="font-mono">28%</span>
        </div>
        <Progress value={28} />
      </div>
    </div>
  );
}

function RadioPreview() {
  const [val, setVal] = useState("monthly");
  return (
    <div className="flex flex-col gap-3">
      <Radio
        label="Monthly · $0/mo"
        name="plan"
        value="monthly"
        checked={val === "monthly"}
        onChange={() => setVal("monthly")}
      />
      <Radio
        label="Annual · save 20%"
        name="plan"
        value="annual"
        checked={val === "annual"}
        onChange={() => setVal("annual")}
      />
      <Radio
        label="Enterprise"
        name="plan"
        value="enterprise"
        checked={val === "enterprise"}
        onChange={() => setVal("enterprise")}
      />
    </div>
  );
}

function SegmentedControlPreview() {
  const [val, setVal] = useState("week");
  return (
    <SegmentedControl value={val} onChange={setVal}>
      <SegmentedControlItem value="day">Day</SegmentedControlItem>
      <SegmentedControlItem value="week">Week</SegmentedControlItem>
      <SegmentedControlItem value="month">Month</SegmentedControlItem>
      <SegmentedControlItem value="year">Year</SegmentedControlItem>
    </SegmentedControl>
  );
}

function SelectPreview() {
  const [val, setVal] = useState("nyc1");
  return (
    <div className="w-full max-w-xs">
      <Select value={val} onValueChange={setVal}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nyc1">New York · NYC1</SelectItem>
          <SelectItem value="sfo3">San Francisco · SFO3</SelectItem>
          <SelectItem value="ams3">Amsterdam · AMS3</SelectItem>
          <SelectItem value="fra1">Frankfurt · FRA1</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function SkeletonPreview() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Skeleton width="60%" />
      <Skeleton width="85%" />
      <Skeleton width="72%" />
      <Skeleton width="45%" />
    </div>
  );
}

function SliderPreview() {
  const [val, setVal] = useState(40);
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <div className="flex justify-between text-[12px] text-[var(--muted-foreground)]">
        <span>Volume</span>
        <span className="font-mono">{val}%</span>
      </div>
      <Slider value={val} onChange={setVal} />
    </div>
  );
}

function StepperPreview() {
  const [step, setStep] = useState(1);
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Stepper currentStep={step} onStepChange={setStep}>
        <StepperStep label="Account" />
        <StepperStep label="Workspace" />
        <StepperStep label="Team" />
        <StepperStep label="Done" />
      </Stepper>
    </div>
  );
}

function SwitchPreview() {
  const [vals, setVals] = useState({ a: true, b: false });
  return (
    <div className="flex flex-col gap-3">
      <Switch
        label="Two-factor auth"
        checked={vals.a}
        onChange={(e) => setVals({ ...vals, a: e.target.checked })}
      />
      <Switch
        label="Public profile"
        checked={vals.b}
        onChange={(e) => setVals({ ...vals, b: e.target.checked })}
      />
      <Switch label="Beta features" checked={false} disabled />
    </div>
  );
}

function SwitchRowPreview() {
  const [vals, setVals] = useState({ a: true, b: false, c: true });
  return (
    <div className="w-full max-w-xs rounded-[3px] border border-[var(--border)]">
      <SwitchRow
        label="Email digests"
        checked={vals.a}
        onChange={() => setVals({ ...vals, a: !vals.a })}
      />
      <SwitchRow
        label="Slack integration"
        checked={vals.b}
        onChange={() => setVals({ ...vals, b: !vals.b })}
      />
      <SwitchRow
        label="Mobile push"
        checked={vals.c}
        onChange={() => setVals({ ...vals, c: !vals.c })}
      />
    </div>
  );
}

function TablePreview() {
  return (
    <div className="w-full max-w-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            ["api-edge-01", "NYC1", "Online"],
            ["cache-warmer", "AMS3", "Deploying"],
            ["db-primary", "NYC1", "Online"],
          ].map(([name, region, status]) => (
            <TableRow key={name}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell className="text-[var(--muted-foreground)]">
                {region}
              </TableCell>
              <TableCell>
                <Badge
                  variant={status === "Online" ? "success" : "warning"}
                  dot
                >
                  {status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TabsPreview() {
  return (
    <div className="w-full max-w-sm">
      <Tabs defaultValue="overview">
        <TabsList variant="underline">
          <TabsTab value="overview">Overview</TabsTab>
          <TabsTab value="instances">Instances</TabsTab>
          <TabsTab value="storage">Storage</TabsTab>
          <TabsTab value="billing">Billing</TabsTab>
        </TabsList>
      </Tabs>
    </div>
  );
}

function TooltipPreview() {
  return (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="ghost" size="sm">
            <Icon name="arrow-up" size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Refresh data</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="ghost" size="sm">
            <Icon name="settings" size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="ghost" size="sm">
            <Icon name="database" size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Databases</TooltipContent>
      </Tooltip>
    </div>
  );
}

function BannerPreview() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <Banner>
        <BannerTitle>Deployment in progress</BannerTitle>
        <BannerDescription>
          Your application is being deployed to production.
        </BannerDescription>
        <BannerAction>
          <Button size="sm">View logs</Button>
        </BannerAction>
      </Banner>
      <Banner>
        <BannerTitle>Update available</BannerTitle>
        <BannerDescription>
          A new version is ready to install.
        </BannerDescription>
      </Banner>
    </div>
  );
}

function TogglePreview() {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="flex flex-wrap gap-3">
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        label="Notifications"
      />
      <Toggle pressed label="Enabled" />
      <Toggle disabled label="Disabled" />
    </div>
  );
}

function RatingPreview() {
  const [val, setVal] = useState(3);
  return (
    <div className="flex flex-col gap-4">
      <Rating value={val} onChange={setVal} />
      <Rating value={4} disabled size="sm" />
      <Rating value={2} size="lg" />
    </div>
  );
}

const CODE_BLOCK_SAMPLE = `import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onSubmit: (value: string) => Promise<void>;
}

export function Form({ onSubmit }: Props) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(value);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button loading={loading} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}`;

function CodeBlockPreview() {
  return (
    <div className="w-full max-w-lg">
      <CodeBlock code={CODE_BLOCK_SAMPLE} lang="tsx" showLanguageSelector />
    </div>
  );
}

function ChipPreview() {
  const [tags, setTags] = useState(["react", "typescript"]);

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Chip key={tag} label={tag} onRemove={() => removeTag(tag)} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip label="Success" variant="success" />
        <Chip label="Warning" variant="warning" />
        <Chip label="Danger" variant="danger" />
        <Chip label="Info" variant="info" />
      </div>
    </div>
  );
}

const previews: Record<string, React.ComponentType> = {
  accordion: AccordionPreview,
  alert: AlertPreview,
  avatar: AvatarPreview,
  badge: BadgePreview,
  breadcrumb: BreadcrumbPreview,
  button: ButtonPreview,
  calendar: CalendarPreview,
  card: CardPreview,
  checkbox: CheckboxPreview,
  "command-palette": CommandPalettePreview,
  "data-table": DataTablePreview,
  "date-range-picker": DateRangePickerPreview,
  dialog: DialogPreview,
  divider: DividerPreview,
  drawer: DrawerPreview,
  "dropdown-menu": DropdownMenuPreview,
  dropzone: DropzonePreview,
  "empty-state": EmptyStatePreview,
  frame: FramePreview,
  input: InputPreview,
  "key-value": KeyValuePreview,
  "multi-select": MultiSelectPreview,
  otp: OTPPreview,
  pagination: PaginationPreview,
  popover: PopoverPreview,
  progress: ProgressPreview,
  radio: RadioPreview,
  "segmented-control": SegmentedControlPreview,
  select: SelectPreview,
  skeleton: SkeletonPreview,
  slider: SliderPreview,
  stepper: StepperPreview,
  switch: SwitchPreview,
  "switch-row": SwitchRowPreview,
  table: TablePreview,
  tabs: TabsPreview,
  tooltip: TooltipPreview,
  banner: BannerPreview,
  toggle: TogglePreview,
  rating: RatingPreview,
  chip: ChipPreview,
  "code-block": CodeBlockPreview,
};

export function ComponentPreview({ name }: { name: string }) {
  const Preview = previews[name];
  if (!Preview) return null;
  return <Preview />;
}
