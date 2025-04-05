
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Home, Mail, Plus, Settings } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
        "minimal",
        "warning",
        "success",
        "info",
        "error",
      ],
      description: "Variante visual del botón",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "Tamaño del botón",
    },
    asChild: {
      control: "boolean",
      description: "Renderizar como hijo usando Radix Slot",
    },
    children: {
      control: "text",
      description: "Contenido del botón",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
    children: <Settings className="h-4 w-4" />,
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail className="mr-2 h-4 w-4" /> Login with Email
      </>
    ),
  },
};

// Ejemplo de uso en diferentes contextos
export const ButtonGroups: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="default">Save</Button>
        <Button variant="outline">Cancel</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" size="sm"><Plus className="h-4 w-4 mr-1" /> New</Button>
        <Button variant="secondary" size="sm"><Home className="h-4 w-4 mr-1" /> Dashboard</Button>
        <Button variant="destructive" size="sm">Delete</Button>
      </div>
    </div>
  ),
};
