
import type { Meta, StoryObj } from "@storybook/react";
import PlaceholderComponent from "./PlaceholderComponent";

const meta: Meta<typeof PlaceholderComponent> = {
  title: "Components/PlaceholderComponent",
  component: PlaceholderComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: { 
      control: "text",
      description: "Texto principal a mostrar"
    },
    subtext: { 
      control: "text",
      description: "Texto secundario opcional"
    },
    bordered: { 
      control: "boolean",
      description: "Si debe mostrar un borde"
    },
    variant: { 
      control: "select", 
      options: ["default", "info", "warning", "error", "success"],
      description: "Estilo visual del componente"
    },
    className: { 
      control: "text",
      description: "Clases CSS adicionales"
    }
  }
};

export default meta;
type Story = StoryObj<typeof PlaceholderComponent>;

export const Default: Story = {
  args: {
    text: "Contenido Placeholder",
    subtext: "Este componente es un ejemplo para Storybook",
  },
};

export const Info: Story = {
  args: {
    text: "Información",
    subtext: "Este es un mensaje informativo",
    variant: "info",
    bordered: true,
  },
};

export const Warning: Story = {
  args: {
    text: "Advertencia",
    subtext: "Este es un mensaje de advertencia",
    variant: "warning",
    bordered: true,
  },
};

export const Error: Story = {
  args: {
    text: "Error",
    subtext: "Este es un mensaje de error",
    variant: "error",
    bordered: true,
  },
};

export const Success: Story = {
  args: {
    text: "Éxito",
    subtext: "La operación se completó correctamente",
    variant: "success",
    bordered: true,
  },
};

export const NoSubtext: Story = {
  args: {
    text: "Solo texto principal",
    variant: "default",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <PlaceholderComponent 
        text="Default Variant" 
        subtext="Estilo predeterminado" 
        bordered 
      />
      <PlaceholderComponent 
        text="Info Variant" 
        subtext="Estilo informativo" 
        variant="info" 
        bordered 
      />
      <PlaceholderComponent 
        text="Warning Variant" 
        subtext="Estilo de advertencia" 
        variant="warning" 
        bordered 
      />
      <PlaceholderComponent 
        text="Error Variant" 
        subtext="Estilo de error" 
        variant="error" 
        bordered 
      />
      <PlaceholderComponent 
        text="Success Variant" 
        subtext="Estilo de éxito" 
        variant="success" 
        bordered 
      />
    </div>
  ),
};

export const CustomStyling: Story = {
  args: {
    text: "Estilos Personalizados",
    subtext: "Con clases CSS adicionales",
    className: "min-h-[200px] shadow-lg",
  },
};
