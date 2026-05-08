import {
  ComponentDocs,
  VariantPreview,
  ExampleBlock,
} from "@/components/documentation-drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Chip } from "@/components/ui/chip";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Rating } from "@/components/ui/rating";
import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Calendar } from "@/components/ui/calendar";
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
import { Drawer } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { KeyValue } from "@/components/ui/key-value";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { OTP } from "@/components/ui/otp";
import { Pagination } from "@/components/ui/pagination";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { SegmentedControl } from "@/components/ui/segmented-control";
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
import { Banner, BannerTitle, BannerDescription } from "@/components/ui/banner";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CommandPalette,
  CommandTab,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command-palette";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Dropzone } from "@/components/ui/dropzone";
import { CodeBlock } from "@/components/ui/code-block";
import {
  Frame,
  FrameHeader,
  FrameTitle,
  FrameAction,
  FrameContent,
  BrowserFrame,
} from "@/components/ui/frame";
import { Radio } from "@/components/ui/radio";
import { SwitchRow } from "@/components/ui/switch-row";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export const COMPONENT_DOCS: Record<string, ComponentDocs> = {
  input: {
    props: [
      {
        name: "label",
        type: "string",
        required: true,
        description: "Floating label text",
      },
      { name: "value", type: "string", description: "Input value" },
      {
        name: "onChange",
        type: "(e: ChangeEvent) => void",
        description: "Change handler",
      },
      {
        name: "type",
        type: "string",
        default: '"text"',
        description: "Input type (text, password, email, etc.)",
      },
      { name: "placeholder", type: "string", description: "Placeholder text" },
      { name: "error", type: "string", description: "Error message" },
      { name: "help", type: "string", description: "Helper text" },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable the input",
      },
      {
        name: "multiline",
        type: "boolean",
        default: "false",
        description: "Enable textarea mode",
      },
      {
        name: "rows",
        type: "number",
        default: "4",
        description: "Number of textarea rows",
      },
      {
        name: "iconRight",
        type: "ReactNode",
        description: "Icon on the right side",
      },
      {
        name: "onIconClick",
        type: "() => void",
        description: "Icon click handler",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: <Input label="Email" placeholder="john@example.com" />,
        code: '<Input label="Email" placeholder="john@example.com" />',
      },
      {
        name: "With Error",
        preview: <Input label="Password" error="Password is required" />,
        code: '<Input label="Password" error="Password is required" />',
      },
      {
        name: "With Helper Text",
        preview: <Input label="API Key" help="Found in your dashboard" />,
        code: '<Input label="API Key" help="Found in your dashboard" />',
      },
      {
        name: "Disabled",
        preview: <Input label="Disabled" disabled value="Cannot edit" />,
        code: '<Input label="Disabled" disabled value="Cannot edit" />',
      },
      {
        name: "Multiline (Textarea)",
        preview: (
          <Input
            label="Description"
            multiline
            placeholder="Enter description..."
          />
        ),
        code: '<Input label="Description" multiline placeholder="Enter description..." />',
      },
      {
        name: "Password with Toggle",
        preview: (
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
          />
        ),
        code: '<Input label="Password" type="password" placeholder="Enter password" />',
      },
    ],
    examples: [
      {
        title: "Basic Form Handler",
        code: `const [email, setEmail] = useState("");

<form onSubmit={(e) => {
  e.preventDefault();
  console.log("Submitted:", email);
}}>
  <Input 
    label="Email" 
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
  />
  <Button type="submit">Submit</Button>
</form>`,
      },
      {
        title: "Search with Debounce",
        code: `const [query, setQuery] = useState("");
const [results, setResults] = useState([]);

useEffect(() => {
  const timer = setTimeout(() => {
    if (query) searchAPI(query).then(setResults);
  }, 300);
  return () => clearTimeout(timer);
}, [query]);

<Input
  label="Search"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  iconRight={<Icon name="search" />}
/>`,
      },
    ],
    integrations: [
      {
        title: "Zod",
        description: "Validate input with Zod schema",
        code: `import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 chars"),
});

const [errors, setErrors] = useState({});

const handleSubmit = (data) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    setErrors(fieldErrors);
  }
};

<Input 
  label="Email" 
  error={errors.email?.[0]}
/>
<Input 
  label="Password" 
  type="password"
  error={errors.password?.[0]}
/>`,
      },
    ],
    relatedComponents: ["Select", "Textarea"],
  },
  button: {
    props: [
      { name: "children", type: "ReactNode", description: "Button content" },
      {
        name: "variant",
        type: "ButtonVariant",
        default: '"primary"',
        description: "Visual style",
      },
      {
        name: "size",
        type: "ButtonSize",
        default: '"md"',
        description: "Button size",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        description: "Show loading spinner",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable the button",
      },
      {
        name: "type",
        type: '"button" | "submit" | "reset"',
        default: '"button"',
        description: "Button type",
      },
    ],
    variants: [
      {
        name: "Variants",
        preview: (
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        ),
      },
      {
        name: "Sizes",
        preview: (
          <div className="flex items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        ),
      },
      {
        name: "Loading State",
        preview: (
          <div className="flex gap-3">
            <Button loading>Loading</Button>
            <Button variant="secondary" loading>
              Loading
            </Button>
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Form Submit",
        code: `// Prevent default and handle submission
<form onSubmit={handleSubmit}>
  <Input label="Email" />
  <Button type="submit">Submit</Button>
</form>

const handleSubmit = (e) => {
  e.preventDefault();
  // Process form data
};`,
      },
      {
        title: "Async Action",
        code: `// Handle async operations like API calls
const [loading, setLoading] = useState(false);

const handleSave = async () => {
  setLoading(true);
  try {
    await api.save(data);
    toast.success("Saved!");
  } catch (err) {
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};

<Button loading={loading} onClick={handleSave}>
  Save Changes
</Button>`,
      },
      {
        title: "Confirmation Dialog",
        code: `// Use with Dialog for destructive actions
const [open, setOpen] = useState(false);

<Button variant="destructive" onClick={() => setOpen(true)}>
  Delete Account
</Button>

<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogContent>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogBody>
      Are you sure? This cannot be undone.
    </DialogBody>
    <DialogFooter>
      <Button variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    ],
    integrations: [
      {
        title: "Zod",
        description: "Use button with Zod form validation",
        code: `import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
});

const [form, setForm] = useState({ name: "", email: "" });
const [errors, setErrors] = useState<Record<string, string>>({});
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  const result = schema.safeParse(form);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    setErrors({
      name: fieldErrors.name?.[0],
      email: fieldErrors.email?.[0],
    });
    return;
  }
  setErrors({});
  setLoading(true);
  try {
    await api.submit(result.data);
  } finally {
    setLoading(false);
  }
};

<form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
  <Input
    label="Name"
    value={form.name}
    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
    error={errors.name}
  />
  <Input
    label="Email"
    value={form.email}
    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
    error={errors.email}
  />
  <Button type="submit" loading={loading}>Submit</Button>
</form>`,
      },
    ],
    relatedComponents: ["Select", "Textarea"],
  },
  badge: {
    props: [
      { name: "children", type: "ReactNode", description: "Badge content" },
      {
        name: "variant",
        type: "BadgeVariant",
        default: '"default"',
        description: "Color variant",
      },
      {
        name: "dot",
        type: "boolean",
        default: "false",
        description: "Show status dot",
      },
    ],
    variants: [
      {
        name: "All Variants",
        preview: (
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        ),
      },
      {
        name: "With Dot",
        preview: (
          <div className="flex flex-wrap gap-2">
            <Badge variant="success" dot>
              Online
            </Badge>
            <Badge variant="warning" dot>
              Pending
            </Badge>
            <Badge variant="destructive" dot>
              Offline
            </Badge>
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Status Badge",
        code: `const statusConfig = {
  online: { variant: "success", label: "Online", dot: true },
  pending: { variant: "warning", label: "Pending", dot: true },
  offline: { variant: "destructive", label: "Offline", dot: true },
};

const status = "online";
const config = statusConfig[status];

<Badge variant={config.variant} dot={config.dot}>
  {config.label}
</Badge>`,
      },
      {
        title: "Count Badge",
        code: `// For notifications or counts
<Badge variant="destructive">3</Badge>

// With custom content
<Badge variant="success">
  <Icon name="check" size={12} />
  Active
</Badge>`,
      },
    ],
    relatedComponents: ["Chip", "StatusIndicator"],
  },
  switch: {
    props: [
      { name: "checked", type: "boolean", description: "Switch state" },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        description: "Change handler",
      },
      { name: "label", type: "string", description: "Label text" },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable switch",
      },
    ],
    variants: [
      {
        name: "States",
        preview: (
          <div className="flex flex-col gap-3">
            <Switch label="Off" />
            <Switch checked label="On" />
            <Switch disabled label="Disabled" />
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Toggle Setting",
        code: `const [settings, setSettings] = useState({
  notifications: true,
  darkMode: false,
});

const toggle = (key) => {
  setSettings(prev => ({ ...prev, [key]: !prev[key] }));
};

<Switch 
  checked={settings.notifications}
  onChange={() => toggle("notifications")}
  label="Push Notifications"
/>
<Switch 
  checked={settings.darkMode}
  onChange={() => toggle("darkMode")}
  label="Dark Mode"
/>`,
      },
      {
        title: "Form Integration",
        code: `// Works like a checkbox in forms
const [formData, setFormData] = useState({ agree: false });

<form onSubmit={handleSubmit}>
  <Switch
    checked={formData.agree}
    onChange={(checked) => setFormData({ agree: checked })}
    label="I agree to terms"
  />
  <Button type="submit">Continue</Button>
</form>`,
      },
    ],
    relatedComponents: ["Checkbox", "Toggle"],
  },
  checkbox: {
    props: [
      { name: "checked", type: "boolean", description: "Checked state" },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        description: "Change handler",
      },
      { name: "label", type: "string", description: "Label text" },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable checkbox",
      },
    ],
    variants: [
      {
        name: "States",
        preview: (
          <div className="flex flex-col gap-3">
            <Checkbox label="Unchecked" />
            <Checkbox checked label="Checked" />
            <Checkbox disabled label="Disabled" />
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Multiple Selections",
        code: `const [selected, setSelected] = useState([]);
const options = ["react", "vue", "angular"];

const toggle = (value) => {
  setSelected(prev => 
    prev.includes(value)
      ? prev.filter(v => v !== value)
      : [...prev, value]
  );
};

{options.map(opt => (
  <Checkbox 
    key={opt}
    checked={selected.includes(opt)}
    onChange={() => toggle(opt)}
    label={opt}
  />
))}`,
      },
      {
        title: "Terms Agreement",
        code: `const [agreed, setAgreed] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault();
  if (!agreed) {
    alert("Please agree to terms");
    return;
  }
  // Continue...
};

<form onSubmit={handleSubmit}>
  <Checkbox
    checked={agreed}
    onChange={setAgreed}
    label="I agree to the terms and conditions"
  />
  <Button type="submit" disabled={!agreed}>
    Continue
  </Button>
</form>`,
      },
    ],
    integrations: [
      {
        title: "Zod",
        description: "Validate checkbox with Zod schema",
        code: `import { z } from "zod";

const schema = z.object({
  agree: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
  subscribe: z.boolean().optional(),
});

const [errors, setErrors] = useState<Record<string, string>>({});
const [form, setForm] = useState({ agree: false, subscribe: false });

const handleSubmit = () => {
  const result = schema.safeParse(form);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    setErrors({
      agree: fieldErrors.agree?.[0],
    });
  }
};

<Checkbox
  checked={form.agree}
  onChange={(checked) => setForm((prev) => ({ ...prev, agree: checked }))}
  label="I agree to the terms and conditions"
/>
{errors.agree && <p className="text-sm text-red-500">{errors.agree}</p>}
<Checkbox
  checked={form.subscribe}
  onChange={(checked) => setForm((prev) => ({ ...prev, subscribe: checked }))}
  label="Subscribe to newsletter"
/>`,
      },
    ],
    relatedComponents: ["Switch", "Radio"],
  },
  toggle: {
    props: [
      { name: "pressed", type: "boolean", description: "Toggle state" },
      {
        name: "onPressedChange",
        type: "(pressed: boolean) => void",
        description: "Change handler",
      },
      { name: "label", type: "string", description: "Label text" },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable toggle",
      },
    ],
    variants: [
      {
        name: "States",
        preview: (
          <div className="flex flex-col gap-3">
            <Toggle pressed={false} label="Off" />
            <Toggle pressed={true} label="On" />
            <Toggle disabled label="Disabled" />
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Filter Tags",
        code: `const [activeFilters, setActiveFilters] = useState([]);

const toggleFilter = (filter) => {
  setActiveFilters(prev => 
    prev.includes(filter)
      ? prev.filter(f => f !== filter)
      : [...prev, filter]
  );
};

const filters = ["React", "Vue", "Angular", "Svelte"];

{filters.map(f => (
  <Toggle
    pressed={activeFilters.includes(f)}
    onPressedChange={() => toggleFilter(f)}
    label={f}
  />
))}`,
      },
    ],
    relatedComponents: ["Switch", "SegmentedControl"],
  },
  alert: {
    props: [
      { name: "children", type: "ReactNode", description: "Alert content" },
      {
        name: "variant",
        type: '"info" | "success" | "warning" | "danger"',
        default: '"info"',
        description: "Alert style",
      },
    ],
    variants: [
      {
        name: "All Variants",
        preview: (
          <div className="flex flex-col gap-4 w-full max-w-md">
            <Alert variant="info">
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>
                This is an informational alert.
              </AlertDescription>
            </Alert>
            <Alert variant="success">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Operation completed successfully.
              </AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Please review before proceeding.
              </AlertDescription>
            </Alert>
            <Alert variant="danger">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong.</AlertDescription>
            </Alert>
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Form Validation",
        code: `const [error, setError] = useState(null);

const handleSubmit = (e) => {
  e.preventDefault();
  if (!email) {
    setError("Email is required");
    return;
  }
  if (!isValidEmail(email)) {
    setError("Invalid email format");
    return;
  }
  // Submit...
};

<form onSubmit={handleSubmit}>
  {error && (
    <Alert variant="danger">
      <AlertTitle>Validation Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )}
  <Input 
    label="Email" 
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);
      setError(null);
    }}
  />
  <Button type="submit">Submit</Button>
</form>`,
      },
    ],
    relatedComponents: ["Banner", "Input"],
  },
  chip: {
    props: [
      {
        name: "label",
        type: "string",
        required: true,
        description: "Chip label text",
      },
      {
        name: "variant",
        type: '"default" | "primary" | "success" | "warning" | "danger"',
        default: '"default"',
        description: "Color variant",
      },
      {
        name: "onRemove",
        type: "() => void",
        description: "Remove button handler",
      },
      { name: "onClick", type: "() => void", description: "Click handler" },
    ],
    variants: [
      {
        name: "Variants",
        preview: (
          <div className="flex flex-wrap gap-2">
            <Chip label="Default" />
            <Chip label="Primary" variant="info" />
            <Chip label="Success" variant="success" />
            <Chip label="Warning" variant="warning" />
            <Chip label="Danger" variant="danger" />
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Filter Chips",
        code: `const [activeFilters, setActiveFilters] = useState(["react"]);

const removeFilter = (filter) => {
  setActiveFilters(prev => prev.filter(f => f !== filter));
};

{activeFilters.map(filter => (
  <Chip 
    key={filter}
    label={filter}
    onRemove={() => removeFilter(filter)}
    variant="info"
  />
))}`,
      },
    ],
    relatedComponents: ["Badge", "Toggle"],
  },
  rating: {
    props: [
      {
        name: "value",
        type: "number",
        default: "0",
        description: "Current rating value",
      },
      {
        name: "onChange",
        type: "(value: number) => void",
        description: "Value change handler",
      },
      {
        name: "max",
        type: "number",
        default: "5",
        description: "Maximum number of stars",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Star size",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable interaction",
      },
    ],
    variants: [
      {
        name: "Sizes",
        preview: (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-[12px] text-[var(--foreground-subtle)]">
                sm
              </span>
              <Rating size="sm" value={3} />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[12px] text-[var(--foreground-subtle)]">
                md
              </span>
              <Rating size="md" value={3} />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[12px] text-[var(--foreground-subtle)]">
                lg
              </span>
              <Rating size="lg" value={3} />
            </div>
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Review Form",
        code: `const [rating, setRating] = useState(0);
const [hoverRating, setHoverRating] = useState(0);

<form onSubmit={handleSubmit}>
  <label>Rate your experience</label>
  <div className="flex gap-1">
    {[1,2,3,4,5].map((star) => (
      <button
        type="button"
        onClick={() => setRating(star)}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
      >
        <Icon 
          name={(star <= (hoverRating || rating)) 
            ? "star-filled" 
            : "star"} 
          className={star <= (hoverRating || rating) 
            ? "text-amber-500" 
            : "text-gray-300"}
        />
      </button>
    ))}
  </div>
  {rating > 0 && <p>You selected {rating} stars</p>}
  <Button type="submit">Submit Review</Button>
</form>`,
      },
    ],
    relatedComponents: [],
  },
  card: {
    props: [
      { name: "children", type: "ReactNode", description: "Card content" },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <Card className="w-[300px] p-4">
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
            <div className="mt-4">Card content area.</div>
            <CardFooter className="mt-4">Card footer actions.</CardFooter>
          </Card>
        ),
      },
    ],
    examples: [
      {
        title: "Interactive Card",
        code: `<Card className="w-[320px] cursor-pointer hover:border-blue-500 transition-colors">
  <CardTitle>Project Alpha</CardTitle>
  <CardDescription>Active project</CardDescription>
  <div className="mt-4 flex items-center gap-2">
    <Badge variant="success">Live</Badge>
    <span className="text-sm">v2.4.0</span>
  </div>
  <CardFooter className="justify-end mt-4">
    <Button size="sm">View</Button>
  </CardFooter>
</Card>`,
      },
      {
        title: "Stats Card",
        code: `<Card className="w-[240px] p-5">
  <CardTitle className="text-lg font-normal">Total Revenue</CardTitle>
  <div className="mt-3 text-3xl font-bold">$24,500</div>
  <div className="mt-2 text-sm text-green-600">+12% from last month</div>
  <CardFooter className="mt-4 justify-end">
    <Button variant="ghost" size="sm">Details</Button>
  </CardFooter>
</Card>`,
      },
    ],
    relatedComponents: ["CardTitle", "CardDescription", "CardFooter"],
  },
  accordion: {
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Accordion items",
      },
      {
        name: "defaultOpen",
        type: "string[]",
        description: "Initially open item keys",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <div className="w-full max-w-[300px]">
            <Accordion defaultOpen={["a"]}>
              <AccordionItem value="a">
                <AccordionTrigger>What is Sharp UI?</AccordionTrigger>
                <AccordionContent>
                  A sharp-edged component registry.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>How to install?</AccordionTrigger>
                <AccordionContent>Use bunx shadcn@latest add</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Multiple Open Items",
        code: `<Accordion defaultOpen={["a", "b"]}>
  <AccordionItem value="a">
    <AccordionTrigger>Section A</AccordionTrigger>
    <AccordionContent>Content for A</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Section B</AccordionTrigger>
    <AccordionContent>Content for B</AccordionContent>
  </AccordionItem>
</Accordion>`,
      },
      {
        title: "With Form",
        code: `const [openSection, setOpenSection] = useState<string[]>([]);

<Accordion defaultOpen={["details"]}>
  <AccordionItem value="details">
    <AccordionTrigger>Your Details</AccordionTrigger>
    <AccordionContent>
      <Input label="Name" className="mb-3" />
      <Input label="Email" />
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="preferences">
    <AccordionTrigger>Preferences</AccordionTrigger>
    <AccordionContent>
      <Switch label="Notifications" />
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
      },
    ],
    relatedComponents: [
      "AccordionItem",
      "AccordionTrigger",
      "AccordionContent",
    ],
  },
  avatar: {
    props: [
      {
        name: "initials",
        type: "string",
        required: true,
        description: "Fallback initials",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Avatar size",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "Sizes",
        preview: (
          <div className="flex items-center gap-4">
            <Avatar initials="SM" size="sm" />
            <Avatar initials="MD" size="md" />
            <Avatar initials="LG" size="lg" />
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "With Image",
        code: `<Avatar 
  src="https://example.com/photo.jpg" 
  alt="John Doe"
  initials="JD"
  size="lg"
/>`,
      },
      {
        title: "Team Avatars",
        code: `const teammates = [
  { initials: "JD", name: "John" },
  { initials: "AS", name: "Alice" },
  { initials: "MK", name: "Mike" },
  { initials: "RL", name: "Rachel" },
];

<div className="flex -space-x-2">
  {teammates.map((t, i) => (
    <Avatar key={i} initials={t.initials} size="sm" className="border-2 border-white" />
  ))}
</div>`,
      },
    ],
    relatedComponents: [],
  },
  breadcrumb: {
    props: [
      { name: "children", type: "ReactNode", description: "Breadcrumb items" },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="#">Home</a>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <a href="#">Products</a>
            </BreadcrumbItem>
            <BreadcrumbItem>Current</BreadcrumbItem>
          </Breadcrumb>
        ),
      },
    ],
    examples: [
      {
        title: "With Icons",
        code: `<Breadcrumb>
  <BreadcrumbItem>
    <a href="/">
      <span className="flex items-center gap-1">
        Home
      </span>
    </a>
  </BreadcrumbItem>
  <BreadcrumbItem><a href="/products">Products</a></BreadcrumbItem>
  <BreadcrumbItem>Details</BreadcrumbItem>
</Breadcrumb>`,
      },
      {
        title: "Settings Breadcrumb",
        code: `<Breadcrumb className="text-sm">
  <BreadcrumbItem><a href="/dashboard">Dashboard</a></BreadcrumbItem>
  <BreadcrumbItem><a href="/settings">Settings</a></BreadcrumbItem>
  <BreadcrumbItem>Account</BreadcrumbItem>
</Breadcrumb>`,
      },
    ],
    relatedComponents: ["BreadcrumbItem"],
  },
  calendar: {
    props: [
      { name: "selected", type: "Date", description: "Selected date" },
      {
        name: "onChange",
        type: "(date: Date) => void",
        description: "Date change handler",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <div className="p-4">
            <Calendar selected={new Date()} onChange={() => {}} />
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        code: `const [selected, setSelected] = useState(new Date());

<Calendar 
  selected={selected}
  onChange={setSelected}
/>

<p className="mt-2">Selected: {selected.toDateString()}</p>`,
      },
      {
        title: "Date Picker",
        code: `const [date, setDate] = useState(null);

const handleSelect = (newDate) => {
  setDate(newDate);
  console.log("Selected:", newDate);
};

<Calendar selected={date} onChange={handleSelect} />`,
      },
    ],
    relatedComponents: ["DateRangePicker"],
  },
  dialog: {
    props: [
      { name: "open", type: "boolean", description: "Dialog open state" },
      { name: "onClose", type: "() => void", description: "Close handler" },
      { name: "children", type: "ReactNode", description: "Dialog content" },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <div className="relative">
            <Dialog open={true} onClose={() => {}}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Confirm Action</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to proceed?
                  </DialogDescription>
                </DialogHeader>
                <DialogBody>
                  <p>This action cannot be undone.</p>
                </DialogBody>
                <DialogFooter>
                  <Button variant="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Form Dialog",
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Edit Profile</Button>

<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
    </DialogHeader>
    <DialogBody>
      <div className="space-y-4">
        <Input label="Name" />
        <Input label="Email" />
      </div>
    </DialogBody>
    <DialogFooter>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={() => setOpen(false)}>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
      {
        title: "Confirmation Dialog",
        code: `const [open, setOpen] = useState(false);

<Button variant="destructive" onClick={() => setOpen(true)}>
  Delete Account
</Button>

<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogDescription>
        This will permanently delete your account and all associated data.
      </DialogDescription>
    </DialogHeader>
    <DialogBody>
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This action is irreversible.</AlertDescription>
      </Alert>
    </DialogBody>
    <DialogFooter>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="destructive" onClick={handleDelete}>Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    ],
    relatedComponents: ["Drawer"],
  },
  divider: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
      { name: "children", type: "ReactNode", description: "Center content" },
    ],
    variants: [
      {
        name: "Horizontal",
        preview: (
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <div>Content before</div>
            <Divider />
            <div>Content after</div>
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "With Label",
        code: `<div className="space-y-4">
  <div>Section One</div>
  <Divider>or</Divider>
  <div>Section Two</div>
</div>`,
      },
      {
        title: "Vertical Divider",
        code: `<div className="flex h-16 items-center">
  <Button>One</Button>
  <Divider className="h-8 mx-4" />
  <Button>Two</Button>
  <Divider className="h-8 mx-4" />
  <Button>Three</Button>
</div>`,
      },
    ],
    relatedComponents: [],
  },
  drawer: {
    props: [
      { name: "open", type: "boolean", description: "Drawer open state" },
      { name: "onClose", type: "() => void", description: "Close handler" },
      { name: "children", type: "ReactNode", description: "Drawer content" },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "Right",
        preview: (
          <div className="relative h-64">
            <Drawer open={true} onClose={() => {}}>
              <div className="p-4">Drawer content</div>
            </Drawer>
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Slide-out Panel",
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Panel</Button>

<Drawer open={open} onClose={() => setOpen(false)}>
  <div className="p-6">
    <h3 className="text-lg font-semibold mb-4">Settings</h3>
    <Switch label="Dark Mode" className="mb-3" />
    <Switch label="Notifications" className="mb-3" />
    <Divider className="my-4" />
    <Button onClick={() => setOpen(false)}>Close</Button>
  </div>
</Drawer>`,
      },
    ],
    relatedComponents: ["Dialog"],
  },
  dropdown: {
    props: [
      {
        name: "children",
        type: "ReactNode",
        description: "Trigger and menu content",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "With Actions",
        code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuItem>Share</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      },
      {
        title: "Icon Button Menu",
        code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm">
      <Icon name="more-horizontal" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Rename</DropdownMenuItem>
    <DropdownMenuItem>Archive</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      },
    ],
    relatedComponents: ["Popover"],
  },
  empty: {
    props: [
      {
        name: "children",
        type: "ReactNode",
        description: "Empty state content",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <EmptyState className="w-[300px]">
            <div className="text-lg font-medium mb-2">No results found</div>
            <div className="text-sm text-muted-foreground">
              Try adjusting your search criteria.
            </div>
          </EmptyState>
        ),
      },
    ],
    examples: [
      {
        title: "With Action",
        code: `<EmptyState className="w-[320px]">
  <div className="text-lg font-medium mb-2">No projects yet</div>
  <div className="text-sm text-muted-foreground mb-4">
    Create your first project to get started.
  </div>
  <Button>
    <Icon name="plus" size={16} className="mr-2" />
    New Project
  </Button>
</EmptyState>`,
      },
      {
        title: "Search Empty",
        code: `<EmptyState className="w-[280px]">
  <div className="text-muted-foreground mb-2">No matches found</div>
  <div className="text-sm">
    We couldn't find anything matching "xyz"
  </div>
  <Button variant="ghost" className="mt-4">
    Clear search
  </Button>
</EmptyState>`,
      },
    ],
    relatedComponents: [],
  },
  keyValue: {
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Value content",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <KeyValue>
              <span className="text-muted-foreground">Name</span>
              <span>John Doe</span>
            </KeyValue>
            <KeyValue>
              <span className="text-muted-foreground">Email</span>
              <span>john@example.com</span>
            </KeyValue>
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Settings Display",
        code: `<div className="space-y-3">
  <KeyValue>
    <span className="text-sm text-muted-foreground">Username</span>
    <span className="font-medium">johndoe</span>
  </KeyValue>
  <KeyValue>
    <span className="text-sm text-muted-foreground">Email</span>
    <span>john@example.com</span>
  </KeyValue>
  <KeyValue>
    <span className="text-sm text-muted-foreground">Role</span>
    <Badge variant="primary">Admin</Badge>
  </KeyValue>
</div>`,
      },
      {
        title: "Stats Display",
        code: `<div className="grid grid-cols-2 gap-4">
  <KeyValue className="p-4 border rounded-lg">
    <span className="text-sm text-muted-foreground">Total Users</span>
    <span className="text-2xl font-bold">1,234</span>
  </KeyValue>
  <KeyValue className="p-4 border rounded-lg">
    <span className="text-sm text-muted-foreground">Active</span>
    <span className="text-2xl font-bold text-green-600">856</span>
  </KeyValue>
</div>`,
      },
    ],
    relatedComponents: [],
  },
  multiSelect: {
    props: [
      { name: "value", type: "string[]", description: "Selected values" },
      {
        name: "onChange",
        type: "(values: string[]) => void",
        description: "Change handler",
      },
      {
        name: "options",
        type: "Option[]",
        required: true,
        description: "Available options",
      },
      {
        name: "placeholder",
        type: "string",
        default: '"Select..."',
        description: "Placeholder text",
      },
      { name: "label", type: "string", description: "Label text" },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <div className="w-[240px]">
            <MultiSelect values={[]} onChange={() => {}}>
              <MultiSelectOption value="react" label="React" />
              <MultiSelectOption value="vue" label="Vue" />
              <MultiSelectOption value="angular" label="Angular" />
            </MultiSelect>
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "With Initial Values",
        code: `const [selected, setSelected] = useState(["react", "vue"]);

<MultiSelect values={selected} onChange={setSelected}>
  <MultiSelectOption value="react" label="React" />
  <MultiSelectOption value="vue" label="Vue" />
  <MultiSelectOption value="angular" label="Angular" />
</MultiSelect>`,
      },
      {
        title: "Tags Selection",
        code: `const [tags, setTags] = useState(["frontend"]);

<MultiSelect values={tags} onChange={setTags} placeholder="Select tags...">
  <MultiSelectOption value="frontend" label="Frontend" />
  <MultiSelectOption value="backend" label="Backend" />
  <MultiSelectOption value="devops" label="DevOps" />
  <MultiSelectOption value="mobile" label="Mobile" />
</MultiSelect>`,
      },
    ],
    integrations: [
      {
        title: "Zod",
        description: "Validate multi-select with Zod schema",
        code: `import { z } from "zod";

const schema = z.object({
  skills: z.array(z.string()).min(1, "Select at least one skill"),
});

const [errors, setErrors] = useState<Record<string, string>>({});
const [skills, setSkills] = useState<string[]>([]);

const handleSubmit = () => {
  const result = schema.safeParse({ skills });
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    setErrors({ skills: fieldErrors.skills?.[0] });
  }
};

<MultiSelect values={skills} onChange={setSkills} label="Skills">
  <MultiSelectOption value="react" label="React" />
  <MultiSelectOption value="vue" label="Vue" />
  <MultiSelectOption value="angular" label="Angular" />
</MultiSelect>
{errors.skills && <p className="text-sm text-red-500">{errors.skills}</p>}`,
      },
    ],
    relatedComponents: ["Select", "Chip"],
  },
  otp: {
    props: [
      { name: "value", type: "string[]", description: "OTP value array" },
      {
        name: "onChange",
        type: "(value: string[]) => void",
        description: "Change handler",
      },
      {
        name: "length",
        type: "number",
        default: "6",
        description: "Number of digits",
      },
    ],
    examples: [
      {
        title: "6-Digit OTP",
        code: `const [otp, setOtp] = useState(["", "", "", "", "", ""]);

<OTP 
  value={otp} 
  onChange={setOtp} 
  length={6} 
/>

<Button 
  className="mt-4" 
  disabled={otp.some(v => !v)}
  onClick={() => verifyOTP(otp.join(""))}
>
  Verify
</Button>`,
      },
      {
        title: "With Paste Support",
        code: `const [otp, setOtp] = useState("");

const handlePaste = (e) => {
  const pasted = e.clipboardData.getData("text");
  if (/^\\d+$/.test(pasted)) {
    setOtp(pasted.slice(0, 6));
    e.preventDefault();
  }
};

<OTP 
  value={otp} 
  onChange={setOtp} 
  length={6}
  onPaste={handlePaste}
/>`,
      },
    ],
    integrations: [
      {
        title: "Zod",
        description: "Validate OTP with Zod schema",
        code: `import { z } from "zod";

const schema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\\d+$/, "OTP must contain only digits"),
});

const [otp, setOtp] = useState(["", "", "", "", "", ""]);
const [error, setError] = useState("");

const handleVerify = () => {
  const result = schema.safeParse({ otp: otp.join("") });
  if (!result.success) {
    setError(result.error.flatten().fieldErrors.otp?.[0] ?? "");
  } else {
    setError("");
  }
};

<OTP value={otp} onChange={setOtp} length={6} />
{error && <p className="text-sm text-red-500 mt-1">{error}</p>}
<Button className="mt-4" onClick={handleVerify}>Verify OTP</Button>`,
      },
    ],
    relatedComponents: ["Input"],
  },
  pagination: {
    props: [
      { name: "currentPage", type: "number", description: "Current page" },
      { name: "totalPages", type: "number", description: "Total pages" },
      {
        name: "onPageChange",
        type: "(page: number) => void",
        description: "Page change handler",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
        ),
      },
    ],
    examples: [
      {
        title: "With Many Pages",
        code: `const [currentPage, setCurrentPage] = useState(1);

<Pagination 
  currentPage={currentPage} 
  totalPages={20} 
  onPageChange={setCurrentPage}
/>

<div className="mt-2 text-sm text-muted-foreground">
  Page {currentPage} of 20
</div>`,
      },
      {
        title: "Client-side Navigation",
        code: `const [page, setPage] = useState(1);
const items = useMemo(() => paginate(allItems, page, 10), [allItems, page]);

<Pagination 
  currentPage={page}
  totalPages={Math.ceil(allItems.length / 10)}
  onPageChange={setPage}
/>

<div className="space-y-2 mt-4">
  {items.map(item => (
    <div key={item.id}>{item.name}</div>
  ))}
</div>`,
      },
    ],
    relatedComponents: [],
  },
  popover: {
    props: [
      { name: "open", type: "boolean", description: "Open state" },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Open change handler",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Trigger and content",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <div className="relative">
            <Popover open={true} onOpenChange={() => {}}>
              <PopoverTrigger>
                <Button>Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div>Popover content here.</div>
              </PopoverContent>
            </Popover>
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "With Form",
        code: `const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger>
    <Button>Filter</Button>
  </PopoverTrigger>
  <PopoverContent className="w-64">
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Status</label>
        <Select className="mt-1">
          <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full" onClick={() => setOpen(false)}>Apply</Button>
    </div>
  </PopoverContent>
</Popover>`,
      },
    ],
    relatedComponents: ["DropdownMenu", "Tooltip"],
  },
  progress: {
    props: [
      { name: "value", type: "number", description: "Progress value (0-100)" },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    examples: [
      {
        title: "With Label",
        code: `const [progress, setProgress] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setProgress(p => p >= 100 ? 0 : p + 10);
  }, 500);
  return () => clearInterval(timer);
}, []);

<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Progress</span>
    <span>{progress}%</span>
  </div>
  <Progress value={progress} />
</div>`,
      },
      {
        title: "Loading Indicator",
        code: `// Determinate progress
<Progress value={65} className="h-2" />

// With custom styling
<Progress 
  value={progress} 
  className="h-3 rounded-full bg-muted" 
/>`,
      },
    ],
    relatedComponents: ["Skeleton"],
  },
  segmented: {
    props: [
      { name: "value", type: "string", description: "Selected segment" },
      {
        name: "onChange",
        type: "(value: string) => void",
        description: "Change handler",
      },
      { name: "children", type: "ReactNode", description: "Segment items" },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <SegmentedControl value="week" onChange={() => {}}>
            <TabsTab value="day">Day</TabsTab>
            <TabsTab value="week">Week</TabsTab>
            <TabsTab value="month">Month</TabsTab>
          </SegmentedControl>
        ),
      },
    ],
    examples: [
      {
        title: "View Toggle",
        code: `const [view, setView] = useState("grid");

<SegmentedControl value={view} onChange={setView}>
  <TabsTab value="grid">
    <Icon name="layout-grid" size={16} />
  </TabsTab>
  <TabsTab value="list">
    <Icon name="list" size={16} />
  </TabsTab>
  <TabsTab value="calendar">
    <Icon name="calendar" size={16} />
  </TabsTab>
</SegmentedControl>`,
      },
      {
        title: "Filter Segments",
        code: `const [filter, setFilter] = useState("all");

<SegmentedControl value={filter} onChange={setFilter}>
  <TabsTab value="all">All</TabsTab>
  <TabsTab value="active">Active</TabsTab>
  <TabsTab value="completed">Completed</TabsTab>
</SegmentedControl>

// Filter data
const filteredItems = items.filter(item => 
  filter === "all" ? true : item.status === filter
);`,
      },
    ],
    relatedComponents: ["Tabs", "Toggle"],
  },
  select: {
    props: [
      { name: "value", type: "string", description: "Selected value" },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Change handler",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Trigger and content",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <Select value="" onValueChange={() => {}}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nyc">New York</SelectItem>
              <SelectItem value="sf">San Francisco</SelectItem>
              <SelectItem value="la">Los Angeles</SelectItem>
            </SelectContent>
          </Select>
        ),
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        code: `const [value, setValue] = useState("");

<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-[240px]">
    <SelectValue placeholder="Select region" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="nyc">New York</SelectItem>
    <SelectItem value="sf">San Francisco</SelectItem>
    <SelectItem value="la">Los Angeles</SelectItem>
  </SelectContent>
</Select>`,
      },
      {
        title: "With Groups",
        code: `const [framework, setFramework] = useState("");

<Select value={framework} onValueChange={setFramework}>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select framework" />
  </SelectTrigger>
  <SelectContent>
    <SelectItemGroup label="Frontend">
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
      <SelectItem value="angular">Angular</SelectItem>
    </SelectItemGroup>
    <SelectItemGroup label="Backend">
      <SelectItem value="node">Node.js</SelectItem>
      <SelectItem value="python">Python</SelectItem>
    </SelectItemGroup>
  </SelectContent>
</Select>`,
      },
    ],
    integrations: [
      {
        title: "Zod",
        description: "Validate select values with Zod schema",
        code: `import { z } from "zod";

const schema = z.object({
  region: z.string().min(1, "Please select a region"),
  framework: z.string().min(1, "Please select a framework"),
});

const [errors, setErrors] = useState<Record<string, string>>({});

const handleSubmit = (data) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    setErrors({
      region: fieldErrors.region?.[0],
      framework: fieldErrors.framework?.[0],
    });
  }
};

<div>
  <Select value={region} onValueChange={setRegion}>
    <SelectTrigger className="w-[200px]">
      <SelectValue placeholder="Select region" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="nyc">New York</SelectItem>
      <SelectItem value="sf">San Francisco</SelectItem>
      <SelectItem value="la">Los Angeles</SelectItem>
    </SelectContent>
  </Select>
  {errors.region && <p className="text-sm text-red-500">{errors.region}</p>}
</div>`,
      },
    ],
    relatedComponents: ["MultiSelect", "Popover"],
  },
  skeleton: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
      { name: "children", type: "ReactNode", description: "Skeleton content" },
    ],
    examples: [
      {
        title: "Card Loading",
        code: `<div className="flex gap-4">
  <Skeleton className="w-48 h-64 rounded-lg" />
  <div className="space-y-2 flex-1">
    <Skeleton className="w-3/4 h-6" />
    <Skeleton className="w-full h-4" />
    <Skeleton className="w-full h-4" />
    <Skeleton className="w-1/2 h-4" />
    <div className="flex gap-2 mt-4">
      <Skeleton className="w-8 h-8 rounded-full" />
      <Skeleton className="w-8 h-8 rounded-full" />
    </div>
  </div>
</div>`,
      },
      {
        title: "List Loading",
        code: `{Array.from({ length: 5 }).map((_, i) => (
  <div key={i} className="flex items-center gap-3 py-2">
    <Skeleton className="w-10 h-10 rounded-full" />
    <div className="space-y-1 flex-1">
      <Skeleton className="w-1/3 h-4" />
      <Skeleton className="w-1/2 h-3" />
    </div>
  </div>
))}`,
      },
    ],
    relatedComponents: ["Progress"],
  },
  slider: {
    props: [
      { name: "value", type: "number", description: "Current value" },
      {
        name: "onChange",
        type: "(value: number) => void",
        description: "Change handler",
      },
      {
        name: "min",
        type: "number",
        default: "0",
        description: "Minimum value",
      },
      {
        name: "max",
        type: "number",
        default: "100",
        description: "Maximum value",
      },
      {
        name: "step",
        type: "number",
        default: "1",
        description: "Step increment",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: <Slider value={50} onChange={() => {}} />,
      },
    ],
    examples: [
      {
        title: "Volume Control",
        code: `const [volume, setVolume] = useState(75);

<Slider 
  value={volume} 
  onChange={setVolume}
  min={0}
  max={100}
/>

<div className="flex items-center gap-2 mt-2">
  <Icon name="volume" size={16} />
  <span>{volume}%</span>
</div>`,
      },
      {
        title: "Range Selection",
        code: `const [range, setRange] = useState([25, 75]);

<Slider 
  value={range[1]} 
  onChange={(v) => setRange([range[0], v])}
  min={0}
  max={100}
  step={5}
/>

<div className="flex justify-between text-sm mt-2">
  <span>Min: {range[0]}</span>
  <span>Max: {range[1]}</span>
</div>`,
      },
    ],
    relatedComponents: ["Input"],
  },
  stepper: {
    props: [
      {
        name: "currentStep",
        type: "number",
        description: "Current step index",
      },
      { name: "children", type: "ReactNode", description: "Step items" },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    examples: [
      {
        title: "Multi-step Form",
        code: `const [step, setStep] = useState(0);

<Stepper currentStep={step}>
  <StepperStep label="Account" />
  <StepperStep label="Profile" />
  <StepperStep label="Confirm" />
</Stepper>

<div className="mt-8">
  {step === 0 && <div>Account form...</div>}
  {step === 1 && <div>Profile form...</div>}
  {step === 2 && <div>Review...</div>}
</div>

<div className="flex gap-2 mt-4">
  <Button 
    variant="ghost" 
    disabled={step === 0}
    onClick={() => setStep(s => s - 1)}
  >
    Back
  </Button>
  <Button onClick={() => setStep(s => s + 1)}>
    {step === 2 ? "Submit" : "Next"}
  </Button>
</div>`,
      },
    ],
    relatedComponents: [],
  },
  banner: {
    props: [
      { name: "children", type: "ReactNode", description: "Banner content" },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <div className="flex flex-col gap-4 w-full max-w-md">
            <Banner>
              <BannerTitle>Info</BannerTitle>
              <BannerDescription>
                This is an informational message.
              </BannerDescription>
            </Banner>
            <Banner>
              <BannerTitle>Success</BannerTitle>
              <BannerDescription>
                Operation completed successfully.
              </BannerDescription>
            </Banner>
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Announcement Banner",
        code: `<Banner>
  <BannerTitle>New Feature Available</BannerTitle>
  <BannerDescription>
    Check out our new dashboard with enhanced analytics.
  </BannerDescription>
  <Button size="sm" className="mt-3">Learn More</Button>
</Banner>`,
      },
      {
        title: "Dismissible Banner",
        code: `const [visible, setVisible] = useState(true);

{visible && (
  <Banner className="relative">
    <BannerTitle>Maintenance scheduled</BannerTitle>
    <BannerDescription>
      System will be down for 2 hours starting at midnight.
    </BannerDescription>
    <Button 
      variant="ghost" 
      size="sm" 
      className="absolute top-2 right-2"
      onClick={() => setVisible(false)}
    >
      <Icon name="x" size={16} />
    </Button>
  </Banner>
)}`,
      },
    ],
    relatedComponents: ["Alert"],
  },
  table: {
    props: [
      { name: "children", type: "ReactNode", description: "Table content" },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <Table className="w-full max-w-md">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane</TableCell>
                <TableCell>Editor</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ),
      },
    ],
    examples: [
      {
        title: "Data Table",
        code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map(user => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <Badge variant={user.active ? "success" : "warning"}>
            {user.active ? "Active" : "Inactive"}
          </Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
      },
      {
        title: "Sortable Table",
        code: `const [sortKey, setSortKey] = useState("name");

const sortedUsers = [...users].sort((a, b) => 
  a[sortKey].localeCompare(b[sortKey])
);

<Table>
  <TableHeader>
    <TableRow>
      <TableHead onClick={() => setSortKey("name")}>
        Name {sortKey === "name" && "↑"}
      </TableHead>
      <TableHead onClick={() => setSortKey("email")}>
        Email {sortKey === "email" && "↑"}
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {sortedUsers.map(user => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
      },
    ],
    relatedComponents: ["DataTable"],
  },
  "data-table": {
    props: [
      {
        name: "data",
        type: "TData[]",
        required: true,
        description: "Array of data objects",
      },
      {
        name: "columns",
        type: "ColumnDef<TData>[]",
        required: true,
        description: "Column definitions from @tanstack/react-table",
      },
      {
        name: "pageSize",
        type: "number",
        default: "10",
        description: "Number of rows per page",
      },
      {
        name: "sortable",
        type: "boolean",
        default: "true",
        description: "Enable column sorting",
      },
      {
        name: "paginated",
        type: "boolean",
        default: "true",
        description: "Show pagination controls",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (() => {
          const columns: ColumnDef<{
            name: string;
            email: string;
            role: string;
          }>[] = [
            { accessorKey: "name", header: "Name" },
            { accessorKey: "email", header: "Email" },
            { accessorKey: "role", header: "Role" },
          ];
          const data = [
            { name: "John Doe", email: "john@example.com", role: "Admin" },
            { name: "Jane Smith", email: "jane@example.com", role: "Editor" },
            { name: "Bob Wilson", email: "bob@example.com", role: "Viewer" },
          ];
          return <DataTable columns={columns} data={data} className="w-full" />;
        })(),
      },
    ],
    examples: [
      {
        title: "Sortable Table",
        code: `const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "active" ? "success" : "warning"}>
        {row.original.status}
      </Badge>
    ),
  },
];

const data: User[] = [
  { name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
  { name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "active" },
  { name: "Bob Wilson", email: "bob@example.com", role: "Viewer", status: "inactive" },
];

<DataTable columns={columns} data={data} />`,
      },
      {
        title: "Custom Cell Rendering",
        code: `const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="font-medium">
        \${row.original.price.toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const stock = row.original.stock;
      return (
        <Badge variant={stock > 0 ? "success" : "destructive"}>
          {stock > 0 ? \`\${stock} in stock\` : "Out of stock"}
        </Badge>
      );
    },
  },
];

const data: Product[] = [
  { name: "Wireless Mouse", price: 29.99, stock: 45 },
  { name: "USB-C Hub", price: 49.99, stock: 0 },
  { name: "Mechanical Keyboard", price: 129.99, stock: 12 },
];

<DataTable columns={columns} data={data} paginated={false} />`,
      },
      {
        title: "Custom Page Size",
        code: `const columns: ColumnDef<Log>[] = [
  { accessorKey: "timestamp", header: "Timestamp" },
  { accessorKey: "action", header: "Action" },
  { accessorKey: "user", header: "User" },
];

const data: Log[] = [
  { timestamp: "2024-01-15 10:30", action: "Login", user: "john" },
  { timestamp: "2024-01-15 10:32", action: "Update profile", user: "john" },
  { timestamp: "2024-01-15 10:45", action: "Export report", user: "jane" },
  { timestamp: "2024-01-15 11:00", action: "Logout", user: "john" },
  { timestamp: "2024-01-15 11:15", action: "Login", user: "bob" },
];

<DataTable columns={columns} data={data} pageSize={3} />`,
      },
    ],
    integrations: [
      {
        title: "TanStack Table",
        description:
          "Advanced features with TanStack Table (sorting, filtering)",
        code: `import { useState, useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface User {
  name: string;
  email: string;
  role: string;
  status: string;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "active" ? "success" : "warning"}>
        {row.original.status}
      </Badge>
    ),
  },
];

const allData: User[] = [
  { name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
  { name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "active" },
  { name: "Bob Wilson", email: "bob@example.com", role: "Viewer", status: "inactive" },
  { name: "Alice Brown", email: "alice@example.com", role: "Admin", status: "active" },
];

function UsersTable() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const filteredData = useMemo(() => {
    return allData.filter((user) => {
      const query = search.toLowerCase();
      const matchesSearch = !search ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesRole = !roleFilter || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [search, roleFilter]);

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <Input
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}`,
      },
    ],
    relatedComponents: ["Table"],
  },
  tabs: {
    props: [
      {
        name: "children",
        type: "ReactNode",
        description: "Tab triggers and content",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "Initial active tab",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTab value="tab1">Overview</TabsTab>
              <TabsTab value="tab2">Settings</TabsTab>
              <TabsTab value="tab3">Users</TabsTab>
            </TabsList>
            <TabsPanel value="tab1">Overview content</TabsPanel>
            <TabsPanel value="tab2">Settings content</TabsPanel>
            <TabsPanel value="tab3">Users content</TabsPanel>
          </Tabs>
        ),
      },
    ],
    examples: [
      {
        title: "With Forms",
        code: `const [activeTab, setActiveTab] = useState("profile");

<Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTab value="profile">Profile</TabsTab>
    <TabsTab value="account">Account</TabsTab>
    <TabsTab value="security">Security</TabsTab>
  </TabsList>
  
  <TabsPanel value="profile">
    <Input label="Display Name" className="mb-3" />
    <Input label="Bio" multiline className="mb-3" />
    <Button>Save Profile</Button>
  </TabsPanel>
  
  <TabsPanel value="account">
    <Input label="Email" type="email" className="mb-3" />
    <Button>Update Email</Button>
  </TabsPanel>
  
  <TabsPanel value="security">
    <Switch label="Two-factor auth" className="mb-3" />
    <Button>Change Password</Button>
  </TabsPanel>
</Tabs>`,
      },
      {
        title: "Dynamic Content",
        code: `const tabs = [
  { id: "overview", label: "Overview", content: "..." },
  { id: "details", label: "Details", content: "..." },
  { id: "settings", label: "Settings", content: "..." },
];

<Tabs defaultValue={tabs[0].id}>
  <TabsList>
    {tabs.map(tab => (
      <TabsTab key={tab.id} value={tab.id}>{tab.label}</TabsTab>
    ))}
  </TabsList>
  {tabs.map(tab => (
    <TabsPanel key={tab.id} value={tab.id}>
      {tab.content}
    </TabsPanel>
  ))}
</Tabs>`,
      },
    ],
    relatedComponents: ["SegmentedControl"],
  },
  tooltip: {
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Trigger element",
      },
      { name: "content", type: "ReactNode", description: "Tooltip content" },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <Tooltip>
            <TooltipTrigger>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>This is a tooltip</TooltipContent>
          </Tooltip>
        ),
      },
    ],
    examples: [
      {
        title: "Icon Button Tooltips",
        code: `<div className="flex gap-2">
  <Tooltip>
    <TooltipTrigger>
      <Button size="sm" variant="ghost">
        <Icon name="copy" size={16} />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Copy to clipboard</TooltipContent>
  </Tooltip>
  
  <Tooltip>
    <TooltipTrigger>
      <Button size="sm" variant="ghost">
        <Icon name="download" size={16} />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Download file</TooltipContent>
  </Tooltip>
</div>`,
      },
      {
        title: "Rich Tooltip Content",
        code: `<Tooltip>
  <TooltipTrigger>
    <Badge>Version</Badge>
  </TooltipTrigger>
  <TooltipContent>
    <div className="text-center">
      <div className="font-medium">v2.4.0</div>
      <div className="text-xs text-muted">Released Jan 15</div>
    </div>
  </TooltipContent>
</Tooltip>`,
      },
    ],
    relatedComponents: ["Popover"],
  },
  "command-palette": {
    props: [
      {
        name: "open",
        type: "boolean",
        required: true,
        description: "Command palette open state",
      },
      { name: "onClose", type: "() => void", description: "Close handler" },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "CommandTab, CommandGroup, and CommandItem components",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    compoundComponents: [
      {
        name: "CommandTab",
        props: [
          {
            name: "label",
            type: "string",
            required: true,
            description: "Tab label",
          },
          { name: "count", type: "number", description: "Item count badge" },
          {
            name: "itemNoun",
            type: "string",
            description: "Noun for results count (e.g. 'users')",
          },
          {
            name: "placeholder",
            type: "string",
            description: "Search placeholder text",
          },
        ],
      },
      {
        name: "CommandGroup",
        props: [
          {
            name: "label",
            type: "string",
            required: true,
            description: "Group heading",
          },
        ],
      },
      {
        name: "CommandItem",
        props: [
          {
            name: "label",
            type: "string",
            required: true,
            description: "Item label",
          },
          { name: "icon", type: "ReactNode", description: "Leading icon" },
          {
            name: "shortcut",
            type: "string[]",
            description: "Keyboard shortcut keys",
          },
          {
            name: "meta",
            type: "string",
            description: "Metadata text (e.g. email)",
          },
          {
            name: "onSelect",
            type: "() => void",
            description: "Selection handler",
          },
        ],
      },
    ],
    examples: [
      {
        title: "Basic Command Palette",
        code: `const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>
    Open Commands
  </Button>

  <CommandPalette open={open} onClose={() => setOpen(false)}>
    <CommandGroup label="Actions">
      <CommandItem
        label="New file"
        shortcut={["N"]}
        onSelect={() => console.log("New file")}
      />
      <CommandItem
        label="Search"
        shortcut={["S"]}
        onSelect={() => console.log("Search")}
      />
    </CommandGroup>
    <CommandGroup label="Recent">
      <CommandItem label="index.tsx" meta="2 mins ago" />
      <CommandItem label="layout.tsx" meta="1 hour ago" />
    </CommandGroup>
  </CommandPalette>
</>`,
      },
      {
        title: "With Tabs",
        code: `const [open, setOpen] = useState(false);

<CommandPalette open={open} onClose={() => setOpen(false)}>
  <CommandTab label="Actions" count={4} placeholder="Search actions…">
    <CommandGroup label="Quick Actions">
      <CommandItem label="Create project" shortcut={["⌘", "N"]} />
      <CommandItem label="Open settings" shortcut={["⌘", ","]} />
    </CommandGroup>
  </CommandTab>
  <CommandTab label="Users" itemNoun="users" placeholder="Search users…">
    <CommandGroup label="Team">
      <CommandItem label="John Doe" meta="john@example.com" />
      <CommandItem label="Jane Smith" meta="jane@example.com" />
    </CommandGroup>
  </CommandTab>
</CommandPalette>`,
      },
    ],
    relatedComponents: ["Dialog", "Popover"],
  },
  "date-range-picker": {
    props: [
      {
        name: "value",
        type: "[Date, Date]",
        description: "Selected date range",
      },
      {
        name: "onChange",
        type: "(range: [Date, Date]) => void",
        description: "Range change handler",
      },
      {
        name: "presets",
        type: "DateRangePickerPreset[]",
        description: "Custom preset shortcuts",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <div className="relative">
            <DateRangePicker
              value={[new Date(), new Date()]}
              onChange={() => {}}
            />
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        code: `const [range, setRange] = useState<[Date, Date]>([
  new Date(2024, 0, 1),
  new Date(2024, 0, 15),
]);

<DateRangePicker value={range} onChange={setRange} />`,
      },
      {
        title: "With Custom Presets",
        code: `const presets = [
  {
    id: "last-week",
    label: "Last week",
    getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 7);
      return [start, end];
    },
  },
  {
    id: "last-quarter",
    label: "Last quarter",
    getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 3);
      return [start, end];
    },
  },
];

<DateRangePicker presets={presets} />`,
      },
    ],
    integrations: [
      {
        title: "Zod",
        description: "Validate date range with Zod schema",
        code: `import { z } from "zod";

const schema = z.object({
  dateRange: z
    .tuple([z.date(), z.date()])
    .refine(([start, end]) => start < end, "End date must be after start date"),
});

const [range, setRange] = useState<[Date, Date] | null>(null);
const [error, setError] = useState("");

const handleSubmit = () => {
  const result = schema.safeParse({ dateRange: range });
  if (!result.success) {
    setError(result.error.errors[0]?.message ?? "Invalid date range");
  }
};

<DateRangePicker value={range} onChange={setRange} />
{error && <p className="text-sm text-red-500 mt-1">{error}</p>}
<Button className="mt-2" onClick={handleSubmit}>Apply</Button>`,
      },
    ],
    relatedComponents: ["Calendar"],
  },
  dropzone: {
    props: [
      {
        name: "onFilesChange",
        type: "(files: UploadedFile[]) => void",
        description: "File list change handler",
      },
      {
        name: "maxSize",
        type: "number",
        default: "25",
        description: "Max file size in MB",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <div className="w-full max-w-[400px]">
            <Dropzone />
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "File Upload",
        code: `const [files, setFiles] = useState<UploadedFile[]>([]);

<Dropzone
  onFilesChange={setFiles}
  maxSize={50}
/>

{files.length > 0 && (
  <div className="mt-2 text-sm text-[var(--foreground-subtle)]">
    {files.length} file(s) uploaded
  </div>
)}`,
      },
    ],
    integrations: [
      {
        title: "Zod",
        description: "Validate file uploads with Zod schema",
        code: `import { z } from "zod";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const schema = z.object({
  files: z
    .array(z.instanceof(File))
    .min(1, "Please upload at least one file")
    .refine(
      (files) => files.every((f) => f.size <= MAX_SIZE),
      "Each file must be under 5MB"
    ),
});

const [files, setFiles] = useState<UploadedFile[]>([]);
const [error, setError] = useState("");

const handleSubmit = () => {
  const result = schema.safeParse({ files: files });
  if (!result.success) {
    setError(result.error.errors[0]?.message ?? "Invalid files");
  }
};

<Dropzone onFilesChange={setFiles} maxSize={5} />
{error && <p className="text-sm text-red-500 mt-1">{error}</p>}`,
      },
    ],
    relatedComponents: ["Input"],
  },
  frame: {
    props: [
      { name: "children", type: "ReactNode", description: "Frame content" },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    compoundComponents: [
      {
        name: "FrameHeader",
        props: [
          {
            name: "children",
            type: "ReactNode",
            description: "Header content",
          },
        ],
      },
      {
        name: "FrameTitle",
        props: [
          { name: "children", type: "ReactNode", description: "Title text" },
        ],
      },
      {
        name: "FrameAction",
        props: [
          {
            name: "children",
            type: "ReactNode",
            description: "Action buttons",
          },
        ],
      },
      {
        name: "FrameContent",
        props: [
          { name: "children", type: "ReactNode", description: "Content area" },
        ],
      },
      {
        name: "BrowserFrame",
        props: [
          {
            name: "url",
            type: "string",
            default: '"example.com"',
            description: "URL in browser bar",
          },
          { name: "children", type: "ReactNode", description: "Frame content" },
        ],
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <Frame className="w-full max-w-[400px]">
            <FrameHeader>
              <FrameTitle>Settings</FrameTitle>
              <FrameAction>
                <Button size="sm">Save</Button>
              </FrameAction>
            </FrameHeader>
            <FrameContent>
              <div className="space-y-3">
                <Switch label="Notifications" />
                <Switch label="Dark mode" />
              </div>
            </FrameContent>
          </Frame>
        ),
      },
      {
        name: "Browser Frame",
        preview: (
          <BrowserFrame
            url="app.sharp-ui.dev/dashboard"
            className="w-full max-w-[400px]"
          >
            <div className="space-y-3">
              <Input label="Search" placeholder="Search..." />
              <Button>Go</Button>
            </div>
          </BrowserFrame>
        ),
      },
    ],
    examples: [
      {
        title: "Settings Panel",
        code: `<Frame className="w-full max-w-[480px]">
  <FrameHeader>
    <FrameTitle>Profile Settings</FrameTitle>
    <FrameAction>
      <Button size="sm">Save</Button>
    </FrameAction>
  </FrameHeader>
  <FrameContent>
    <div className="space-y-4">
      <Input label="Display name" value="John" />
      <Input label="Email" value="john@example.com" />
      <Switch label="Email notifications" checked />
    </div>
  </FrameContent>
</Frame>`,
      },
    ],
    relatedComponents: ["Card"],
  },
  radio: {
    props: [
      { name: "label", type: "string", description: "Radio label text" },
      { name: "checked", type: "boolean", description: "Checked state" },
      {
        name: "onChange",
        type: "(e: ChangeEvent) => void",
        description: "Change handler",
      },
      {
        name: "name",
        type: "string",
        description: "Group name for radio behavior",
      },
      { name: "value", type: "string", description: "Input value" },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable radio",
      },
    ],
    variants: [
      {
        name: "States",
        preview: (
          <div className="flex flex-col gap-3">
            <Radio name="demo" value="1" label="Option A" checked />
            <Radio name="demo" value="2" label="Option B" />
            <Radio name="demo" value="3" label="Option C (disabled)" disabled />
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Radio Group",
        code: `const [value, setValue] = useState("free");

const plans = [
  { value: "free", label: "Free", desc: "Basic features" },
  { value: "pro", label: "Pro", desc: "Advanced features" },
  { value: "enterprise", label: "Enterprise", desc: "Custom solution" },
];

{plans.map((plan) => (
  <div
    key={plan.value}
    className="flex items-center gap-3 rounded-[3px] border border-[var(--border)] p-4"
    onClick={() => setValue(plan.value)}
  >
    <Radio
      name="plan"
      value={plan.value}
      checked={value === plan.value}
      onChange={() => {}}
    />
    <div>
      <div className="font-medium">{plan.label}</div>
      <div className="text-sm text-[var(--foreground-subtle)]">{plan.desc}</div>
    </div>
  </div>
))}`,
      },
    ],
    relatedComponents: ["Checkbox", "Switch"],
  },
  "switch-row": {
    props: [
      {
        name: "label",
        type: "string",
        required: true,
        description: "Label text",
      },
      { name: "checked", type: "boolean", description: "Switch state" },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        description: "Change handler",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes",
      },
    ],
    variants: [
      {
        name: "States",
        preview: (
          <div className="w-full max-w-[300px] rounded-[3px] border border-[var(--border)]">
            <SwitchRow label="Notifications" checked />
            <SwitchRow label="Dark mode" />
            <SwitchRow label="Auto-save" checked />
          </div>
        ),
      },
    ],
    examples: [
      {
        title: "Settings List",
        code: `const [settings, setSettings] = useState({
  push: true,
  email: false,
  sms: true,
});

const toggle = (key: keyof typeof settings) => {
  setSettings(prev => ({ ...prev, [key]: !prev[key] }));
};

<div className="rounded-[3px] border border-[var(--border)]">
  <SwitchRow
    label="Push notifications"
    checked={settings.push}
    onChange={() => toggle("push")}
  />
  <SwitchRow
    label="Email notifications"
    checked={settings.email}
    onChange={() => toggle("email")}
  />
  <SwitchRow
    label="SMS notifications"
    checked={settings.sms}
    onChange={() => toggle("sms")}
  />
</div>`,
      },
    ],
    relatedComponents: ["Switch", "Toggle"],
  },

  "code-block": {
    props: [
      {
        name: "code",
        type: "string",
        required: true,
        description: "The source code string to display.",
      },
      {
        name: "lang",
        type: "BundledLanguage",
        default: '"tsx"',
        description:
          "Shiki language identifier. Accepts any language bundled with Shiki — tsx, typescript, python, rust, go, sql, yaml, docker, etc. Import CodeLang for the full type.",
      },
      {
        name: "filename",
        type: "string",
        description:
          "Optional filename shown on the left of the header bar. Useful when displaying multiple related snippets.",
      },
      {
        name: "showLanguageSelector",
        type: "boolean",
        default: "false",
        description:
          "Renders a language selector in the header. Selecting a different language re-highlights the code live without changing the prop.",
      },
      {
        name: "showLineNumbers",
        type: "boolean",
        default: "false",
        description: "Prepends line numbers to each line using CSS counters.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional classes applied to the outer wrapper.",
      },
    ],
    variants: [
      {
        name: "Default",
        preview: (
          <div className="w-full">
            <CodeBlock
              code={`import { Button } from "@/components/ui/button";\n\nexport function Example() {\n  return <Button>Deploy</Button>;\n}`}
              lang="tsx"
            />
          </div>
        ),
        code: `import { CodeBlock } from "@/components/ui/code-block";\n\n<CodeBlock\n  code={source}\n  lang="tsx"\n/>`,
      },
      {
        name: "With filename",
        preview: (
          <div className="w-full">
            <CodeBlock
              code={`export default {\n  name: "@nemu-ai/sharp-ui",\n  version: "0.1.0",\n  registry: "https://sharp.dragos.cc"\n};`}
              lang="json"
              filename="package.json"
            />
          </div>
        ),
        code: `<CodeBlock\n  code={source}\n  lang="json"\n  filename="package.json"\n/>`,
      },
      {
        name: "Language selector",
        preview: (
          <div className="w-full">
            <CodeBlock
              code={`SELECT id, email, created_at\nFROM users\nWHERE active = true\nORDER BY created_at DESC\nLIMIT 20;`}
              lang="sql"
              showLanguageSelector
            />
          </div>
        ),
        code: `<CodeBlock\n  code={source}\n  lang="sql"\n  showLanguageSelector\n/>`,
      },
      {
        name: "With line numbers",
        preview: (
          <div className="w-full">
            <CodeBlock
              code={`function fibonacci(n: number): number {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(fibonacci(10));`}
              lang="typescript"
              showLineNumbers
            />
          </div>
        ),
        code: `<CodeBlock\n  code={source}\n  lang="typescript"\n  showLineNumbers\n/>`,
      },
      {
        name: "Shell / bash",
        preview: (
          <div className="w-full">
            <CodeBlock
              code={`bunx --bun shadcn@latest init @nemu-ai/sharp-ui\nbunx --bun shadcn@latest add @nemu-ai/sharp-ui/button\nbunx --bun shadcn@latest add @nemu-ai/sharp-ui/input`}
              lang="bash"
              filename="terminal"
            />
          </div>
        ),
        code: `<CodeBlock\n  code={source}\n  lang="bash"\n  filename="terminal"\n/>`,
      },
    ],
    examples: [
      {
        title: "Displaying a snippet in a docs page",
        code: `import { CodeBlock } from "@/components/ui/code-block";

const snippet = \`import { Button } from "@/components/ui/button";

export function Example() {
  return <Button>Deploy</Button>;
}\`;

export default function DocsPage() {
  return (
    <div className="prose">
      <h2>Basic usage</h2>
      <CodeBlock code={snippet} lang="tsx" />
    </div>
  );
}`,
      },
      {
        title: "Multiple snippets with filenames",
        code: `import { CodeBlock } from "@/components/ui/code-block";

const snippets = [
  {
    filename: "app/layout.tsx",
    lang: "tsx" as const,
    code: \`import "./sharp-ui.css";\`,
  },
  {
    filename: "app/globals.css",
    lang: "css" as const,
    code: \`@import "./sharp-ui.css";\`,
  },
];

export function InstallGuide() {
  return (
    <div className="flex flex-col gap-3">
      {snippets.map((s) => (
        <CodeBlock key={s.filename} {...s} />
      ))}
    </div>
  );
}`,
      },
      {
        title: "Dynamic language switching",
        code: `import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import type { CodeLang } from "@/components/ui/code-block";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";

const examples: Record<string, { lang: CodeLang; code: string }> = {
  TypeScript: {
    lang: "typescript",
    code: \`const greet = (name: string): string => \\\`Hello, \\\${name}!\\\`;\`,
  },
  Python: {
    lang: "python",
    code: \`def greet(name: str) -> str:\\n    return f"Hello, {name}!"\`,
  },
  Go: {
    lang: "go",
    code: \`func greet(name string) string {\\n    return fmt.Sprintf("Hello, %s!", name)\\n}\`,
  },
};

export function LanguageTabs() {
  const [active, setActive] = useState("TypeScript");
  const { lang, code } = examples[active];

  return (
    <div className="flex flex-col gap-3">
      <SegmentedControl value={active} onChange={setActive}>
        {Object.keys(examples).map((k) => (
          <SegmentedControlItem key={k} value={k}>{k}</SegmentedControlItem>
        ))}
      </SegmentedControl>
      <CodeBlock code={code} lang={lang} />
    </div>
  );
}`,
      },
      {
        title: "Using the CodeLang type",
        code: `import { CodeBlock } from "@/components/ui/code-block";
import type { CodeLang } from "@/components/ui/code-block";

interface Snippet {
  title: string;
  lang: CodeLang;
  code: string;
}

function SnippetCard({ title, lang, code }: Snippet) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">{title}</p>
      <CodeBlock code={code} lang={lang} showLineNumbers />
    </div>
  );
}`,
      },
    ],
    relatedComponents: ["Tabs", "SegmentedControl"],
  },
};

const NAME_ALIASES: Record<string, string> = {
  "dropdown-menu": "dropdown",
  "empty-state": "empty",
  "key-value": "keyValue",
  "multi-select": "multiSelect",
  "segmented-control": "segmented",
  "data-table": "data-table",
  "switch-row": "switch-row",
  "command-palette": "command-palette",
  "date-range-picker": "date-range-picker",
  dropzone: "dropzone",
  frame: "frame",
  radio: "radio",
};

export function getComponentDocs(name: string): ComponentDocs | undefined {
  return COMPONENT_DOCS[NAME_ALIASES[name] ?? name];
}
