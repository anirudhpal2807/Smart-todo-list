# Creating Custom Renderers in JSON Forms

This guide explains how to create custom renderers for JSON Forms in an Angular application. Custom renderers allow you to control the appearance and behavior of form elements.

## Why Create Custom Renderers?

Custom renderers are useful when you need to:

- Apply specific styling to form elements (like Tailwind CSS)
- Add custom validation or error handling
- Create complex UI components for specific data types
- Implement organization-specific design systems

## Basic Structure of a Custom Renderer

A custom renderer in JSON Forms consists of two main parts:

1. **The renderer component** - An Angular component that renders the UI
2. **The tester function** - A function that determines when to use this renderer

## Step-by-Step Guide

### 1. Create a new component

Create a new TypeScript file for your renderer component:

```typescript
import { Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-control',
  template: `
    <!-- Your template here -->
  `,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CustomControlRenderer extends JsonFormsControl {
  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }
  
  // Add your custom methods here
}
```

### 2. Define your template

Replace the template with your custom HTML:

```typescript
template: `
  <div [formGroup]="form">
    <label [for]="id">{{ label }}</label>
    <input
      [id]="id"
      type="text"
      [formControlName]="''"
      [value]="value"
      (input)="onChange($event)"
      class="your-custom-styles"
    />
    <div *ngIf="!isValid">{{ error }}</div>
  </div>
`
```

### 3. Implement necessary methods

Add methods to handle user interactions:

```typescript
getEventValue = (event: any) => event.target.value;

onChange(event: any) {
  this.setValue(this.getEventValue(event));
}
```

### 4. Create a tester function

The tester function determines when your renderer should be used:

```typescript
import { 
  isStringControl, 
  RankedTester, 
  rankWith 
} from '@jsonforms/core';

export const customControlTester: RankedTester = rankWith(
  3, // priority (higher number = higher priority)
  isStringControl // predicate function
);
```

### 5. Register your renderer

Create an index file to export your renderers:

```typescript
import { CustomControlRenderer, customControlTester } from './custom-control.renderer';

export const customRenderers = [
  { 
    renderer: CustomControlRenderer, 
    tester: customControlTester 
  }
];

export { CustomControlRenderer, customControlTester };
```

### 6. Use your custom renderers in the JSON Forms component

```html
<jsonforms
  [data]="data"
  [schema]="schema"
  [uischema]="uischema"
  [renderers]="renderers"
  (dataChange)="onChange($event)">
</jsonforms>
```

In your component class:

```typescript
import { customRenderers } from './custom-renderers';

export class AppComponent {
  renderers = customRenderers;
  // ...
}
```

## Example: Custom Text Field with Tailwind CSS

Here's an example of a custom text field renderer with Tailwind CSS styling:

```typescript
@Component({
  selector: 'app-custom-text-control',
  template: `
    <div 
      class="my-3"
      [formGroup]="form"
    >
      <label 
        *ngIf="label"
        class="block text-sm font-medium text-gray-700 mb-1"
        [for]="id"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>
      
      <input
        [id]="id"
        type="text"
        [formControlName]="''"
        [placeholder]="description || ''"
        [readonly]="readonly"
        [disabled]="!enabled"
        class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        [class.border-red-500]="!isValid"
        (input)="onChange($event)"
      />
      
      <div *ngIf="!isValid" class="text-red-500 text-xs mt-1">
        {{ error }}
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CustomTextControlRenderer extends JsonFormsControl {
  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  getEventValue = (event: any) => event.target.value;

  onChange(event: any) {
    this.setValue(this.getEventValue(event));
  }
}

export const customTextControlTester: RankedTester = rankWith(
  3,
  isStringControl
);
```

## Advanced Custom Renderers

For more complex renderers, you might need to:

1. **Handle different data types** - Create specialized renderers for different formats (dates, enums, objects)
2. **Add complex validation** - Implement custom validation logic beyond simple schema validation
3. **Create layout renderers** - Customize how groups of controls are displayed (cards, tabs, accordions)
4. **Add custom actions** - Implement buttons or other interactive elements

## Resources

For more information, refer to:

- [JSON Forms Documentation](https://jsonforms.io/docs/custom-renderers)
- The official examples in the JSON Forms GitHub repository
- Angular component documentation 