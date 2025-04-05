
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";

const meta: Meta<typeof Card> = {
  title: "Components/UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px] p-6">
      <h3 className="text-lg font-semibold">Simple Card</h3>
      <p className="text-sm text-muted-foreground mt-2">This is a simple card without using sub-components.</p>
    </Card>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Track your learning journey</CardDescription>
        </div>
        <Badge variant="secondary">75%</Badge>
      </CardHeader>
      <CardContent>
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary w-3/4 rounded-full"></div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue Learning</Button>
      </CardFooter>
    </Card>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[700px]">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-4">
          <CardHeader className="p-2">
            <CardTitle className="text-base">Card {i}</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-sm">Content for card {i}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
