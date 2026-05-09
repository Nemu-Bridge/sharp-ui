Sharp UI

A sharp-edged component registry for React. All components are unstyled at the token level - you control the design through CSS variables - and installed directly into your project via the shadcn CLI rather than imported from a package.

Preview: https://sharp.dragos.cc

Installation

Run this in your project to initialize Sharp UI:

```
npx @nemu-ai/sharp-ui
```

This sets up your project, injects all CSS variables and global styles into your `globals.css` automatically, and configures the registry for future installs.

Add individual components after init:

```
npx shadcn@latest add @nemu-ai/button
npx shadcn@latest add @nemu-ai/input
npx shadcn@latest add @nemu-ai/dialog
```

Requirements

- React 18 or 19
- Tailwind CSS v4
- TypeScript (recommended)

Some components have peer dependencies that the CLI installs automatically:

- `motion` - accordion, command palette, date range picker, drawer, dropzone, progress, rating
- `@base-ui-components/react` - button, dialog
- `@tabler/icons-react` - icon, and any component that depends on icon
- `@tanstack/react-table` - data table

Globals

CSS variables and global styles are injected into your `globals.css` automatically during init. No manual imports needed.

All components read from CSS custom properties. Override any variable in your own stylesheet to retheme everything at once.

CSS variables

Surface and text

| Variable               | Default (light) | Purpose                                                    |
| ---------------------- | --------------- | ---------------------------------------------------------- |
| `--background`         | `#ffffff`       | Page and component background                              |
| `--foreground`         | `#0f172a`       | Primary text                                               |
| `--foreground-subtle`  | `#64748b`       | Secondary labels, placeholders, helper text                |
| `--muted-foreground`   | `#475569`       | Descriptions, captions, dimmed content                     |
| `--card`               | `#ffffff`       | Card surface background                                    |
| `--card-foreground`    | `#0f172a`       | Text on cards                                              |
| `--popover`            | `#ffffff`       | Popover and dropdown background                            |
| `--popover-foreground` | `#0f172a`       | Text in popovers                                           |
| `--surface-alt`        | `#f8fafc`       | Slightly elevated surface - sidebar, table headers, footer |
| `--surface-hover`      | `#f1f5f9`       | Hover state background for surface elements                |
| `--muted`              | `#f8fafc`       | Muted container - skeleton base, icon backgrounds          |
| `--accent`             | `#f1f5f9`       | Accent surface - table row hover                           |
| `--accent-foreground`  | `#0f172a`       | Text on accent surface                                     |

Borders and inputs

| Variable          | Default (light) | Purpose                                         |
| ----------------- | --------------- | ----------------------------------------------- |
| `--border`        | `#e2e8f0`       | Default border on most components               |
| `--border-strong` | `#cbd5e1`       | Elevated border - input fields, select triggers |
| `--border-focus`  | `#005bff`       | Border color when an input is focused           |
| `--input`         | `#cbd5e1`       | Input border in its default state               |
| `--ring`          | `#005bff`       | Focus ring color                                |
| `--radius`        | `3px`           | Global border radius used by all components     |

Semantic colors

Each semantic color ships a solid variant, a soft (low-opacity) background, a soft border, and a foreground.

| Variable                                     | Purpose                                                  |
| -------------------------------------------- | -------------------------------------------------------- |
| `--primary` / `--primary-foreground`         | Brand blue - used on primary buttons and selected states |
| `--secondary` / `--secondary-foreground`     | Neutral secondary surface                                |
| `--destructive` / `--destructive-foreground` | Error actions and danger states                          |
| `--warning` / `--warning-foreground`         | Warning states                                           |
| `--success` / `--success-foreground`         | Success states                                           |

Blue palette

| Variable             | Purpose                                                   |
| -------------------- | --------------------------------------------------------- |
| `--blue`             | Primary interactive blue                                  |
| `--blue-hover`       | Hover shade of blue                                       |
| `--blue-active`      | Active/pressed shade of blue                              |
| `--blue-soft`        | Low-opacity blue background - selected items, info badges |
| `--blue-soft-border` | Border to pair with `--blue-soft`                         |
| `--blue-foreground`  | Text on solid blue backgrounds                            |

Green palette

| Variable              | Purpose                            |
| --------------------- | ---------------------------------- |
| `--green`             | Success green                      |
| `--green-soft`        | Low-opacity green background       |
| `--green-soft-border` | Border to pair with `--green-soft` |
| `--green-foreground`  | Text on solid green backgrounds    |

Amber palette

| Variable              | Purpose                            |
| --------------------- | ---------------------------------- |
| `--amber`             | Warning amber                      |
| `--amber-soft`        | Low-opacity amber background       |
| `--amber-soft-border` | Border to pair with `--amber-soft` |
| `--amber-foreground`  | Text on solid amber backgrounds    |

Red palette

| Variable            | Purpose                          |
| ------------------- | -------------------------------- |
| `--red`             | Danger red                       |
| `--red-soft`        | Low-opacity red background       |
| `--red-soft-border` | Border to pair with `--red-soft` |
| `--red-foreground`  | Text on solid red backgrounds    |

Violet palette

| Variable               | Purpose                             |
| ---------------------- | ----------------------------------- |
| `--violet`             | Violet accent                       |
| `--violet-soft`        | Low-opacity violet background       |
| `--violet-soft-border` | Border to pair with `--violet-soft` |

Misc

| Variable          | Purpose                                           |
| ----------------- | ------------------------------------------------- |
| `--kbd-bg`        | Keyboard shortcut chip background                 |
| `--modal-overlay` | Semi-transparent backdrop for dialogs and drawers |

Dark mode is handled by the `.dark` class on the root element. All variables are redefined under `.dark` - no further changes are needed in component code.

Keyframe animations used internally:

- `content-show` / `content-hide` - dialog entry and exit
- `overlay-show` / `overlay-hide` - backdrop fade
- `dropdown-in` - dropdown and popover entry

The `::selection` color is set to `--primary` with white text. Scrollbars are styled to 4 px with `--border-strong` thumb color.

Utility

`cn(...classes)` - merges Tailwind class names using `clsx` + `tailwind-merge`. Installed at `lib/cn.ts`.

```tsx
import { cn } from "@/lib/cn";

<div className={cn("base-class", condition && "conditional-class")} />;
```

Icon

Dynamic icon wrapper around `@tabler/icons-react`. Pass any Tabler icon name in kebab-case.

```tsx
import { Icon } from "@/components/ui/icon";

<Icon name="check" size={16} />
<Icon name="chevron-down" size={20} className="text-[var(--foreground-subtle)]" />
```

Props:

| Prop        | Type            | Default | Description                                           |
| ----------- | --------------- | ------- | ----------------------------------------------------- |
| `name`      | `string`        | -       | Tabler icon name in kebab-case (e.g. `"info-circle"`) |
| `size`      | `number`        | `20`    | Icon size in px                                       |
| `className` | `string`        | -       | Additional classes                                    |
| `style`     | `CSSProperties` | -       | Inline styles                                         |

Components

Accordion

Expand/collapse sections with animated height transition. Multiple items can be open simultaneously.

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

<Accordion defaultOpen={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Sharp UI?</AccordionTrigger>
    <AccordionContent>
      A sharp-edged component registry for React.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How do I install it?</AccordionTrigger>
    <AccordionContent>
      Use the shadcn CLI with the registry URL.
    </AccordionContent>
  </AccordionItem>
</Accordion>;
```

`Accordion` props:

| Prop          | Type       | Default | Description                   |
| ------------- | ---------- | ------- | ----------------------------- |
| `defaultOpen` | `string[]` | `[]`    | Values of items open on mount |
| `className`   | `string`   | -       |                               |

`AccordionItem` props:

| Prop        | Type     | Default | Description       |
| ----------- | -------- | ------- | ----------------- |
| `value`     | `string` | -       | Unique identifier |
| `className` | `string` | -       |                   |

Alert

Inline feedback banner. Renders an icon, title, and description in a colored container.

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

<Alert variant="info">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>A new region is available.</AlertDescription>
</Alert>

<Alert variant="danger">
  <AlertTitle>Deployment failed</AlertTitle>
  <AlertDescription>Check the build logs for details.</AlertDescription>
</Alert>
```

`Alert` props:

| Prop        | Type                                           | Default  | Description           |
| ----------- | ---------------------------------------------- | -------- | --------------------- |
| `variant`   | `"info" \| "success" \| "warning" \| "danger"` | `"info"` | Color scheme and icon |
| `className` | `string`                                       | -        |                       |

- `info` - blue, info-circle icon
- `success` - green, check icon
- `warning` - amber, alert-circle icon
- `danger` - red, circle-x icon

Avatar

Initials-based avatar with size variants. `AvatarStack` renders a horizontal overlap of avatars with an overflow count.

```tsx
import { Avatar, AvatarStack } from "@/components/ui/avatar";

<Avatar initials="JD" size="md" />

<AvatarStack
  avatars={[{ initials: "JD" }, { initials: "RA" }, { initials: "MK" }]}
  max={2}
/>
```

`Avatar` props:

| Prop        | Type                   | Default | Description                                  |
| ----------- | ---------------------- | ------- | -------------------------------------------- |
| `initials`  | `string`               | -       | Up to two characters displayed in the avatar |
| `size`      | `"sm" \| "md" \| "lg"` | `"md"`  | `sm` = 32px, `md` = 40px, `lg` = 56px        |
| `className` | `string`               | -       |                                              |

`AvatarStack` props:

| Prop        | Type                     | Default | Description                         |
| ----------- | ------------------------ | ------- | ----------------------------------- |
| `avatars`   | `{ initials: string }[]` | -       | List of avatar data                 |
| `max`       | `number`                 | -       | Truncate after this many, show `+N` |
| `className` | `string`                 | -       |                                     |

Badge

Compact status chip. Supports a dot indicator for live status.

```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="primary">Active</Badge>
<Badge variant="success" dot>Online</Badge>
<Badge variant="destructive">Failed</Badge>
```

`Badge` props:

| Prop        | Type                                                                                                                                                            | Default     | Description                       |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------- |
| `variant`   | `"default" \| "primary" \| "blue" \| "success" \| "green" \| "warning" \| "amber" \| "destructive" \| "red" \| "violet" \| "secondary" \| "outline" \| "solid"` | `"default"` | Color scheme                      |
| `dot`       | `boolean`                                                                                                                                                       | `false`     | Show a small dot before the label |
| `className` | `string`                                                                                                                                                        | -           |                                   |

`primary` and `blue` are identical. `success` and `green` are identical. `warning` and `amber` are identical. `destructive` and `red` are identical. `secondary` and `violet` are identical.

Banner

Full-width notification container with title, description, and action slots.

```tsx
import {
  Banner,
  BannerTitle,
  BannerDescription,
  BannerAction,
} from "@/components/ui/banner";

<Banner>
  <BannerTitle>Update available</BannerTitle>
  <BannerDescription>Version 2.4.0 is ready to deploy.</BannerDescription>
  <BannerAction>
    <Button size="sm">Deploy now</Button>
  </BannerAction>
</Banner>;
```

All sub-components accept `children` and `className`.

Breadcrumb

Hierarchical navigation trail.

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbPage>API keys</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumb>;
```

`BreadcrumbLink` renders an `<a>` when `href` is provided, otherwise a `<span>`.

Button

Built on `@base-ui-components/react/button`. Forwards refs and supports a loading spinner that preserves button width.

```tsx
import { Button } from "@/components/ui/button";

<Button>Deploy</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="destructive">Delete project</Button>
<Button loading>Saving...</Button>
```

Props:

| Prop      | Type                                                                                                                | Default     | Description                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `variant` | `"primary" \| "secondary" \| "destructive" \| "destructive-outline" \| "ghost" \| "link" \| "warning" \| "success"` | `"primary"` | Visual style                                                           |
| `size`    | `"sm" \| "md" \| "lg"`                                                                                              | `"md"`      | `sm` = 40px height, `md` = 56px, `lg` = 64px                           |
| `loading` | `boolean`                                                                                                           | `false`     | Disables the button and shows an animated spinner in place of children |

All native `<button>` attributes are forwarded.

- `primary` - solid blue, uses `--blue` / `--blue-hover` / `--blue-active`
- `secondary` - bordered, uses `--border-strong` and `--surface-alt` on hover
- `destructive` - bordered red label, fills red on hover
- `destructive-outline` - transparent with red border
- `ghost` - no border, fills `--surface-alt` on hover
- `link` - inline text link with animated underline, uses `--blue`
- `warning` - soft amber background, fills amber on hover
- `success` - soft green background, fills green on hover

Calendar

Embedded single-month calendar for date selection.

```tsx
import { Calendar } from "@/components/ui/calendar";

const [date, setDate] = useState<Date>();

<Calendar selected={date} onChange={setDate} />;
```

Props:

| Prop        | Type                   | Default | Description                       |
| ----------- | ---------------------- | ------- | --------------------------------- |
| `selected`  | `Date`                 | -       | Currently selected date           |
| `onChange`  | `(date: Date) => void` | -       | Called when the user picks a date |
| `className` | `string`               | -       |                                   |

Today's date is marked with a small blue dot. Days from adjacent months are rendered in a muted color. The calendar is uncontrolled by default for the current month view.

Card

Surface container with optional title, description, and footer.

```tsx
import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

<Card>
  <CardTitle>API keys</CardTitle>
  <CardDescription>Manage your personal access tokens.</CardDescription>
  <p>Content goes here.</p>
  <CardFooter>
    <Button size="sm">Create key</Button>
  </CardFooter>
</Card>;
```

All sub-components accept `children` and `className`. The footer is right-aligned with a top border.

Checkbox

Styled checkbox that visually replaces the native control.

```tsx
import { Checkbox } from "@/components/ui/checkbox";

<Checkbox
  label="Enable notifications"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>;
```

Props:

| Prop       | Type                 | Default | Description                         |
| ---------- | -------------------- | ------- | ----------------------------------- |
| `label`    | `string`             | -       | Label rendered next to the checkbox |
| `checked`  | `boolean`            | -       |                                     |
| `onChange` | `ChangeEventHandler` | -       |                                     |
| `disabled` | `boolean`            | -       |                                     |

All other native `<input>` attributes are forwarded.

Chip

Tag with an optional remove button. Use inside `MultiSelect` or standalone for displaying selected filters.

```tsx
import { Chip } from "@/components/ui/chip";

<Chip label="react" variant="info" onRemove={() => remove("react")} />;
```

Props:

| Prop        | Type                                                        | Default     | Description                          |
| ----------- | ----------------------------------------------------------- | ----------- | ------------------------------------ |
| `label`     | `string`                                                    | -           | Displayed text                       |
| `variant`   | `"default" \| "success" \| "warning" \| "danger" \| "info"` | `"default"` | Color scheme                         |
| `onRemove`  | `() => void`                                                | -           | If provided, an × button is rendered |
| `className` | `string`                                                    | -           |                                      |

Command palette

Full-screen command palette with keyboard navigation, search, and optional tabs. Triggered by your own button or key binding.

```tsx
import {
  CommandPalette,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command-palette";

const [open, setOpen] = useState(false);

<CommandPalette open={open} onClose={() => setOpen(false)}>
  <CommandGroup label="Navigation">
    <CommandItem
      label="Dashboard"
      shortcut={["G", "D"]}
      onSelect={() => router.push("/dashboard")}
    />
    <CommandItem
      label="Settings"
      shortcut={["G", "S"]}
      onSelect={() => router.push("/settings")}
    />
  </CommandGroup>
  <CommandGroup label="Actions">
    <CommandItem
      label="New project"
      shortcut={["N"]}
      onSelect={() => setNewProjectOpen(true)}
    />
  </CommandGroup>
</CommandPalette>;
```

With tabs:

```tsx
import {
  CommandPalette,
  CommandTab,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command-palette";

<CommandPalette open={open} onClose={() => setOpen(false)}>
  <CommandTab label="Commands" placeholder="Search commands...">
    <CommandGroup label="Navigation">
      <CommandItem label="Dashboard" onSelect={() => {}} />
    </CommandGroup>
  </CommandTab>
  <CommandTab label="Files" count={12} placeholder="Search files...">
    <CommandGroup label="Recent">
      <CommandItem
        label="schema.prisma"
        meta="Modified today"
        onSelect={() => {}}
      />
    </CommandGroup>
  </CommandTab>
</CommandPalette>;
```

Keyboard: up/down arrows to navigate, enter to select, escape to close, tab to switch between tabs.

`CommandPalette` props:

| Prop        | Type         | Default | Description                        |
| ----------- | ------------ | ------- | ---------------------------------- |
| `open`      | `boolean`    | -       | Controls visibility                |
| `onClose`   | `() => void` | -       | Called on escape or backdrop click |
| `className` | `string`     | -       | Applied to the palette panel       |

`CommandItem` props:

| Prop       | Type         | Default | Description                              |
| ---------- | ------------ | ------- | ---------------------------------------- |
| `label`    | `string`     | -       | Displayed name                           |
| `icon`     | `ReactNode`  | -       | Optional icon before the label           |
| `shortcut` | `string[]`   | -       | Keyboard shortcut keys rendered as chips |
| `meta`     | `string`     | -       | Secondary text rendered at the right     |
| `onSelect` | `() => void` | -       | Called when the item is activated        |

`CommandGroup` props:

| Prop    | Type     | Description     |
| ------- | -------- | --------------- |
| `label` | `string` | Section heading |

`CommandTab` props:

| Prop          | Type     | Description                           |
| ------------- | -------- | ------------------------------------- |
| `label`       | `string` | Tab label                             |
| `count`       | `number` | Optional badge count on the tab       |
| `placeholder` | `string` | Search input placeholder for this tab |

Data table

Sortable, paginated table built on TanStack Table v8. Column definitions follow the TanStack `ColumnDef` API.

```tsx
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@/components/ui/data-table";

type User = { name: string; email: string; role: string };

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name", size: 200 },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role", size: 120 },
];

<DataTable columns={columns} data={users} pageSize={20} />;
```

Props:

| Prop        | Type                 | Default | Description                 |
| ----------- | -------------------- | ------- | --------------------------- |
| `data`      | `TData[]`            | -       | Row data                    |
| `columns`   | `ColumnDef<TData>[]` | -       | TanStack column definitions |
| `pageSize`  | `number`             | `10`    | Rows per page               |
| `sortable`  | `boolean`            | `true`  | Enable column sorting       |
| `paginated` | `boolean`            | `true`  | Show pagination footer      |
| `className` | `string`             | -       |                             |

Date range picker

Two-month calendar with preset ranges and apply/cancel actions.

```tsx
import { DateRangePicker } from "@/components/ui/date-range-picker";

const [range, setRange] = useState<[Date, Date]>([new Date(), new Date()]);

<DateRangePicker value={range} onChange={setRange} />;
```

Props:

| Prop        | Type                            | Default | Description                  |
| ----------- | ------------------------------- | ------- | ---------------------------- |
| `value`     | `[Date, Date]`                  | -       | Selected start and end dates |
| `onChange`  | `(range: [Date, Date]) => void` | -       |                              |
| `className` | `string`                        | -       |                              |

Dialog

Accessible modal built on `@base-ui-components/react/dialog`. Animated entry and exit. Closes on backdrop click or escape.

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogContent>
    <DialogClose />
    <DialogHeader>
      <DialogTitle>Confirm deletion</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogBody>
      All data associated with this project will be permanently deleted.
    </DialogBody>
    <DialogFooter>
      <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button variant="destructive" size="sm">
        Delete
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

`Dialog` props:

| Prop      | Type         | Default | Description |
| --------- | ------------ | ------- | ----------- |
| `open`    | `boolean`    | -       |             |
| `onClose` | `() => void` | -       |             |

`DialogContent` defaults to `max-w-[520px]`. Pass `className` to widen or constrain it. `DialogClose` renders an × button in the top-right corner.

Divider

Horizontal or vertical rule.

```tsx
import { Divider } from "@/components/ui/divider";

<Divider />
<Divider orientation="vertical" />
```

Props:

| Prop          | Type                         | Default        | Description |
| ------------- | ---------------------------- | -------------- | ----------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |             |
| `className`   | `string`                     | -              |             |

Drawer

Animated side sheet that slides in from the right. Closes on backdrop click or escape.

```tsx
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerSection,
} from "@/components/ui/drawer";

<Drawer open={open} onClose={() => setOpen(false)}>
  <DrawerHeader>
    <div>
      <DrawerTitle>Team member</DrawerTitle>
      <DrawerDescription>Manage access and roles.</DrawerDescription>
    </div>
  </DrawerHeader>
  <DrawerSection>
    <p>Content here.</p>
  </DrawerSection>
</Drawer>;
```

`Drawer` props:

| Prop        | Type         | Default | Description                                    |
| ----------- | ------------ | ------- | ---------------------------------------------- |
| `open`      | `boolean`    | -       |                                                |
| `onClose`   | `() => void` | -       |                                                |
| `className` | `string`     | -       | Applied to the panel, max-w `440px` by default |

`DrawerSection` adds a bottom border except on the last child.

Dropdown menu

Click-triggered dropdown with labels, items, separators, shortcuts, and nested sub-menus.

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="secondary" size="sm">
      Options
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuItem onClick={() => router.push("/settings")}>
      Settings
      <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

`DropdownMenuContent` props:

| Prop    | Type               | Default   | Description                                  |
| ------- | ------------------ | --------- | -------------------------------------------- |
| `align` | `"start" \| "end"` | `"start"` | Horizontal alignment relative to the trigger |

Dropzone

Drag-and-drop file upload area. Files are displayed below the zone with a simulated progress indicator.

```tsx
import { Dropzone } from "@/components/ui/dropzone";

<Dropzone maxSize={25} onFilesChange={(files) => setFiles(files)} />;
```

Props:

| Prop            | Type                              | Default | Description                                |
| --------------- | --------------------------------- | ------- | ------------------------------------------ |
| `maxSize`       | `number`                          | `25`    | Maximum file size in MB shown in the label |
| `onFilesChange` | `(files: UploadedFile[]) => void` | -       | Called when files are added or removed     |
| `className`     | `string`                          | -       |                                            |

`UploadedFile` shape: `{ name: string; size: string; progress: number }`.

Empty state

Centered placeholder for views with no content.

```tsx
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateAction,
} from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";

<EmptyState>
  <EmptyStateIcon>
    <Icon name="inbox" size={40} />
  </EmptyStateIcon>
  <EmptyStateTitle>No deployments yet</EmptyStateTitle>
  <EmptyStateDescription>
    Push your first commit to trigger a deployment.
  </EmptyStateDescription>
  <EmptyStateAction>
    <Button size="sm">Read the docs</Button>
  </EmptyStateAction>
</EmptyState>;
```

All sub-components accept `children` and `className`.

Frame

Panel and browser chrome containers for dashboard layouts.

`Frame` is a simple bordered container. `BrowserFrame` adds a mock browser toolbar with traffic-light dots and a URL bar.

```tsx
import { Frame, FrameHeader, FrameTitle, FrameAction, FrameContent, BrowserFrame } from "@/components/ui/frame";

<Frame>
  <FrameHeader>
    <FrameTitle>Team settings</FrameTitle>
    <FrameAction>
      <Button size="sm">Save</Button>
    </FrameAction>
  </FrameHeader>
  <FrameContent>
    <Switch label="Two-factor auth" />
  </FrameContent>
</Frame>

<BrowserFrame url="app.example.com/dashboard">
  <p>Preview content</p>
</BrowserFrame>
```

`BrowserFrame` props:

| Prop  | Type     | Default         | Description                        |
| ----- | -------- | --------------- | ---------------------------------- |
| `url` | `string` | `"example.com"` | Text shown in the mock address bar |

Input

Floating-label text input. The label transitions from placeholder position to a small uppercase label above the field when the input is focused or has a value.

```tsx
import { Input } from "@/components/ui/input";

<Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
<Input label="Password" type="password" />
<Input label="Notes" multiline rows={5} />
<Input label="Username" error="Username is already taken." />
<Input label="API key" help="Only shown once. Store it somewhere safe." />
```

Props:

| Prop          | Type         | Default  | Description                                                             |
| ------------- | ------------ | -------- | ----------------------------------------------------------------------- |
| `label`       | `string`     | -        | Required. Doubles as the floating label and accessible label            |
| `type`        | `string`     | `"text"` | Standard input type. `"password"` automatically adds a show/hide toggle |
| `error`       | `string`     | -        | Displays below the field in red and turns the border red                |
| `help`        | `string`     | -        | Displays below the field in muted color. Suppressed when `error` is set |
| `multiline`   | `boolean`    | `false`  | Renders a `<textarea>` instead of `<input>`                             |
| `rows`        | `number`     | `4`      | Row count when `multiline` is true                                      |
| `iconRight`   | `ReactNode`  | -        | Custom icon rendered in the right slot                                  |
| `onIconClick` | `() => void` | -        | Click handler for the right icon                                        |

All other native `<input>` attributes are forwarded.

Key value

Definition list for displaying structured metadata.

```tsx
import { KeyValue, KeyValueItem } from "@/components/ui/key-value";

<KeyValue>
  <KeyValueItem label="Region" value="us-east-1" />
  <KeyValueItem label="Node ID" value="node_01j2k3l4m5n6" />
  <KeyValueItem label="Created" value="2024-08-14" />
</KeyValue>;
```

`KeyValueItem` props:

| Prop    | Type     | Description                                                      |
| ------- | -------- | ---------------------------------------------------------------- |
| `label` | `string` | Left column                                                      |
| `value` | `string` | Right column. Rendered in monospace when the label contains "id" |

Multi select

Searchable multi-value select with inline chip display.

```tsx
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";

<MultiSelect
  values={selected}
  onChange={setSelected}
  placeholder="Choose frameworks..."
>
  <MultiSelectOption value="react" label="React" />
  <MultiSelectOption value="vue" label="Vue" />
  <MultiSelectOption value="svelte" label="Svelte" />
</MultiSelect>;
```

`MultiSelect` props:

| Prop          | Type                         | Default         | Description                    |
| ------------- | ---------------------------- | --------------- | ------------------------------ |
| `values`      | `string[]`                   | `[]`            | Selected values                |
| `onChange`    | `(values: string[]) => void` | -               |                                |
| `placeholder` | `string`                     | `"Add tags..."` | Shown when nothing is selected |

OTP

One-time password digit input. Auto-advances on input and handles backspace navigation between cells.

```tsx
import { OTP } from "@/components/ui/otp";

const [code, setCode] = useState(Array(6).fill(""));

<OTP length={6} value={code} onChange={setCode} />;
```

Props:

| Prop        | Type                        | Default | Description                           |
| ----------- | --------------------------- | ------- | ------------------------------------- |
| `length`    | `number`                    | `6`     | Number of digit cells                 |
| `value`     | `string[]`                  | -       | Controlled value, one string per cell |
| `onChange`  | `(value: string[]) => void` | -       |                                       |
| `className` | `string`                    | -       |                                       |

Only numeric input is accepted.

Pagination

Page navigation with prev/next and numbered page buttons.

```tsx
import { Pagination } from "@/components/ui/pagination";

<Pagination currentPage={page} totalPages={12} onPageChange={setPage} />;
```

Props:

| Prop           | Type                     | Description             |
| -------------- | ------------------------ | ----------------------- |
| `currentPage`  | `number`                 | Active page (1-indexed) |
| `totalPages`   | `number`                 | Total number of pages   |
| `onPageChange` | `(page: number) => void` |                         |

Popover

Anchored floating panel. Can be uncontrolled (manages its own open state) or controlled.

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverBody,
  PopoverFooter,
  PopoverItem,
} from "@/components/ui/popover";

<Popover>
  <PopoverTrigger>
    <Button variant="secondary" size="sm">
      Columns
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Visible columns</PopoverTitle>
    <PopoverBody>
      <PopoverItem
        label="Name"
        checked={cols.name}
        onChange={(v) => setCols((c) => ({ ...c, name: v }))}
      />
      <PopoverItem
        label="Email"
        checked={cols.email}
        onChange={(v) => setCols((c) => ({ ...c, email: v }))}
      />
    </PopoverBody>
    <PopoverFooter>
      <Button size="sm">Apply</Button>
    </PopoverFooter>
  </PopoverContent>
</Popover>;
```

Controlled usage: pass `open` and `onOpenChange` to `Popover`.

`PopoverItem` renders a labeled checkbox row.

Progress

Animated progress bar using a Motion layout animation.

```tsx
import { Progress } from "@/components/ui/progress";

<Progress value={72} max={100} />;
```

Props:

| Prop        | Type     | Default | Description          |
| ----------- | -------- | ------- | -------------------- |
| `value`     | `number` | -       | Current value        |
| `max`       | `number` | `100`   | Maximum value        |
| `className` | `string` | -       | Applied to the track |

Radio

Styled radio input. Group multiple `Radio` components using a shared `name`.

```tsx
import { Radio } from "@/components/ui/radio";

<Radio name="plan" value="free" label="Free" checked={plan === "free"} onChange={() => setPlan("free")} />
<Radio name="plan" value="pro" label="Pro" checked={plan === "pro"} onChange={() => setPlan("pro")} />
```

Props:

| Prop       | Type                 | Description            |
| ---------- | -------------------- | ---------------------- |
| `name`     | `string`             | Groups radios together |
| `value`    | `string`             | Value for this option  |
| `label`    | `string`             | Label text             |
| `checked`  | `boolean`            |                        |
| `onChange` | `ChangeEventHandler` |                        |
| `disabled` | `boolean`            |                        |

Rating

Star rating input with animated scale on interaction.

```tsx
import { Rating } from "@/components/ui/rating";

<Rating value={rating} onChange={setRating} max={5} size="md" />;
```

Props:

| Prop       | Type                      | Default | Description                             |
| ---------- | ------------------------- | ------- | --------------------------------------- |
| `value`    | `number`                  | `0`     | Current rating                          |
| `onChange` | `(value: number) => void` | -       |                                         |
| `max`      | `number`                  | `5`     | Number of stars                         |
| `size`     | `"sm" \| "md" \| "lg"`    | `"md"`  | Star icon size (`14`, `20`, or `26` px) |
| `disabled` | `boolean`                 | `false` |                                         |

Segmented control

Button-group toggle for mutually exclusive options. A common alternative to tabs when the options are short.

```tsx
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";

<SegmentedControl value={view} onChange={setView}>
  <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
  <SegmentedControlItem value="list">List</SegmentedControlItem>
  <SegmentedControlItem value="table">Table</SegmentedControlItem>
</SegmentedControl>;
```

`SegmentedControl` props:

| Prop       | Type                      | Description            |
| ---------- | ------------------------- | ---------------------- |
| `value`    | `string`                  | Currently active value |
| `onChange` | `(value: string) => void` |                        |

Select

Custom single-value select dropdown. Matches the height of the `Input` component.

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

<Select value={region} onValueChange={setRegion}>
  <SelectTrigger>
    <SelectValue placeholder="Select region" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>United States</SelectLabel>
      <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
      <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>;
```

`Select` props:

| Prop            | Type                      | Description               |
| --------------- | ------------------------- | ------------------------- |
| `value`         | `string`                  | Controlled selected value |
| `onValueChange` | `(value: string) => void` |                           |

Skeleton

Loading placeholder with a shimmer animation.

```tsx
import { Skeleton } from "@/components/ui/skeleton";

<Skeleton width="100%" height={16} />
<Skeleton width={200} height={12} className="mt-2" />
```

Props:

| Prop        | Type               | Default  | Description |
| ----------- | ------------------ | -------- | ----------- |
| `width`     | `string \| number` | `"100%"` |             |
| `height`    | `string \| number` | `"12px"` |             |
| `className` | `string`           | -        |             |

Slider

Mouse-drag range input. Fires `onChange` on release.

```tsx
import { Slider } from "@/components/ui/slider";

<Slider value={volume} onChange={setVolume} min={0} max={100} />;
```

Props:

| Prop       | Type                      | Default | Description |
| ---------- | ------------------------- | ------- | ----------- |
| `value`    | `number`                  | -       |             |
| `onChange` | `(value: number) => void` | -       |             |
| `min`      | `number`                  | `0`     |             |
| `max`      | `number`                  | `100`   |             |

Stepper

Multi-step progress indicator. Steps are marked done, current, or upcoming.

```tsx
import { Stepper, StepperStep } from "@/components/ui/stepper";

<Stepper currentStep={1} onStepChange={setStep}>
  <StepperStep label="Account" />
  <StepperStep label="Team" />
  <StepperStep label="Billing" />
  <StepperStep label="Review" />
</Stepper>;
```

`Stepper` props:

| Prop           | Type                     | Default | Description                          |
| -------------- | ------------------------ | ------- | ------------------------------------ |
| `currentStep`  | `number`                 | `0`     | Zero-indexed active step             |
| `onStepChange` | `(step: number) => void` | -       | Called when a step circle is clicked |

Done steps show a check icon. The current step has a blue glow ring. Connecting lines fill blue as steps are completed.

Switch

Toggle switch with label.

```tsx
import { Switch } from "@/components/ui/switch";

<Switch
  label="Enable two-factor authentication"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>;
```

Props:

| Prop       | Type                 | Description |
| ---------- | -------------------- | ----------- |
| `label`    | `string`             | Label text  |
| `checked`  | `boolean`            |             |
| `onChange` | `ChangeEventHandler` |             |
| `disabled` | `boolean`            |             |

Switch row

Full-width labeled switch for use in settings lists. The entire row is clickable.

```tsx
import { SwitchRow } from "@/components/ui/switch-row";

<SwitchRow label="Marketing emails" checked={marketing} onChange={setMarketing} />
<SwitchRow label="Security alerts" checked={alerts} onChange={setAlerts} />
```

`SwitchRow` props:

| Prop       | Type                         | Description                                    |
| ---------- | ---------------------------- | ---------------------------------------------- |
| `label`    | `string`                     |                                                |
| `checked`  | `boolean`                    |                                                |
| `onChange` | `(checked: boolean) => void` | Receives the new value directly, not the event |

Table

Base table primitives. Use `DataTable` for the full feature set. Use `Table` directly when you need complete control over rendering.

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>api-server</TableCell>
      <TableCell>
        <Badge variant="success">Running</Badge>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

`Table` props:

| Prop      | Type                  | Default     | Description                                                           |
| --------- | --------------------- | ----------- | --------------------------------------------------------------------- |
| `variant` | `"default" \| "card"` | `"default"` | `"card"` enables `table-fixed` layout, used internally by `DataTable` |

Tabs

Tab navigation with two visual variants.

```tsx
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";

<Tabs defaultValue="overview">
  <TabsList variant="underline">
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="deployments" count={3}>
      Deployments
    </TabsTab>
    <TabsTab value="settings">Settings</TabsTab>
  </TabsList>
  <TabsPanel value="overview">...</TabsPanel>
  <TabsPanel value="deployments">...</TabsPanel>
  <TabsPanel value="settings">...</TabsPanel>
</Tabs>;
```

`Tabs` props:

| Prop            | Type                      | Default | Description                     |
| --------------- | ------------------------- | ------- | ------------------------------- |
| `defaultValue`  | `string`                  | -       | Uncontrolled default active tab |
| `value`         | `string`                  | -       | Controlled active tab           |
| `onValueChange` | `(value: string) => void` | -       |                                 |

`TabsList` props:

| Prop      | Type                       | Default     | Description                                                                                                             |
| --------- | -------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| `variant` | `"default" \| "underline"` | `"default"` | `"default"` is pill-style on a gray background. `"underline"` is a borderless tab bar with an animated bottom indicator |

`TabsTab` props:

| Prop    | Type     | Description                                     |
| ------- | -------- | ----------------------------------------------- |
| `value` | `string` |                                                 |
| `count` | `number` | Optional count badge rendered next to the label |

Toggle

Button that maintains a pressed/unpressed state.

```tsx
import { Toggle } from "@/components/ui/toggle";

<Toggle pressed={bold} onPressedChange={setBold} label="Bold" />
<Toggle pressed={italic} onPressedChange={setItalic} label="Italic" variant="outline" />
```

Props:

| Prop              | Type                         | Default     | Description                                                                   |
| ----------------- | ---------------------------- | ----------- | ----------------------------------------------------------------------------- |
| `pressed`         | `boolean`                    | `false`     |                                                                               |
| `onPressedChange` | `(pressed: boolean) => void` | -           |                                                                               |
| `label`           | `string`                     | -           | Button text                                                                   |
| `variant`         | `"default" \| "outline"`     | `"default"` | `"default"` fills with `--foreground` when pressed. `"outline"` adds a border |
| `disabled`        | `boolean`                    | `false`     |                                                                               |

Tooltip

CSS-only hover tooltip. No JavaScript or portals - the tooltip is absolutely positioned relative to the trigger.

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost">
      <Icon name="copy" size={16} />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Copy to clipboard</TooltipContent>
</Tooltip>;
```

`TooltipTrigger` props:

| Prop      | Type      | Default | Description                                                                    |
| --------- | --------- | ------- | ------------------------------------------------------------------------------ |
| `asChild` | `boolean` | `false` | When true, merges props onto the child element instead of wrapping with a span |

The tooltip appears above the trigger. It fades in on group hover using Tailwind's `group` class on the `Tooltip` wrapper.

Registry API

The registry exposes two endpoints. Both return JSON and include `Access-Control-Allow-Origin: *`.

`GET /r/:name`

Returns the full registry item for the named component, with file content embedded. This is what the shadcn CLI fetches when installing a component.

Response shape:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "...",
  "dependencies": ["@base-ui-components/react"],
  "registryDependencies": ["https://sharp.dragos.cc/r/utils"],
  "files": [
    {
      "path": "components/ui/button.tsx",
      "type": "registry:ui",
      "target": "components/ui/button.tsx",
      "content": "..."
    }
  ]
}
```

Internal `registryDependencies` (components defined in this registry) are rewritten to absolute URLs so the CLI can resolve them without any additional configuration.

`GET /r/index.json`

Returns an index of all registry items with their install URLs. Useful for tooling and discovery.

`GET /registry.json`

Returns the full registry including the `url` template used by the shadcn CLI to resolve `@nemu-ai/sharp-ui/component` installs.

License

MIT
