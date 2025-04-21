"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    model: "gpt-4o",
    temperature: "0.7",
    maxTokens: "2000",
    contextWindow: "16k",
  })

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your system settings have been updated successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Configure system-wide settings for the application.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="model">AI Model</Label>
              <Select
                defaultValue={settings.model}
                onValueChange={(value) => setSettings({ ...settings, model: value })}
              >
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4-vision">GPT-4 Vision</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                id="temperature"
                type="number"
                defaultValue={settings.temperature}
                min="0"
                max="1"
                step="0.1"
                onChange={(e) => setSettings({ ...settings, temperature: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Controls randomness: 0 is deterministic, 1 is creative</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-tokens">Max Tokens</Label>
              <Input
                id="max-tokens"
                type="number"
                defaultValue={settings.maxTokens}
                min="100"
                max="4000"
                step="100"
                onChange={(e) => setSettings({ ...settings, maxTokens: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="context-window">Context Window Size</Label>
              <Select
                defaultValue={settings.contextWindow}
                onValueChange={(value) => setSettings({ ...settings, contextWindow: value })}
              >
                <SelectTrigger id="context-window">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8k">8K tokens</SelectItem>
                  <SelectItem value="16k">16K tokens</SelectItem>
                  <SelectItem value="32k">32K tokens</SelectItem>
                  <SelectItem value="128k">128K tokens</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Maximum number of tokens the model can process</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings}>Save Settings</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
