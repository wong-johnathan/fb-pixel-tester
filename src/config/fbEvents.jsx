export const fbEvents = [
  {
    name: "Purchase",
    description: "When a purchase is made",
    parameters: [
      {
        name: "content_ids",
        description: "(seperate fields with ,)",
        type: "string",
      },
      {
        name: "content_type",
        type: "string",
      },
      {
        name: "quantity",
        type: "number",
      },
      {
        name: "currency",
        type: "string",
      },
      {
        name: "value",
        type: "number",
      },
    ],
  },
  {
    name: "AddToCart",
    description: "When an item is added to the shopping cart",
    parameters: [
      {
        name: "content_ids",
        description: "(seperate fields with ,)",
        type: "string",
      },
      {
        name: "content_type",
        type: "string",
      },
      {
        name: "quantity",
        type: "number",
      },
      {
        name: "currency",
        type: "string",
      },
      {
        name: "value",
        type: "number",
      },
    ],
  },
  {
    name: "Search",
    description: "When a search query is entered",
    parameters: [
      {
        name: "search_string",
        type: "string",
      },
    ],
  },
  {
    name: "ViewContent",
    description: "When content is viewed",
    parameters: [
      {
        name: "content_ids",
        description: "(seperate fields with ,)",
        type: "string",
      },
      {
        name: "content_type",
        type: "string",
      },
      {
        name: "currency",
        type: "string",
      },
      {
        name: "value",
        type: "number",
      },
    ],
  },
  {
    name: "InitiateCheckout",
    description: "When the checkout process is initiated",
    parameters: [
      {
        name: "currency",
        type: "string",
      },
      {
        name: "value",
        type: "number",
      },
    ],
  },
  {
    name: "CompleteRegistration",
    description: "When a registration is completed",
    parameters: [
      {
        name: "content_name",
        type: "string",
      },
    ],
  },
  {
    name: "Lead",
    description: "When a lead is generated",
    parameters: [
      {
        name: "content_name",
        type: "string",
      },
    ],
  },
  {
    name: "AddPaymentInfo",
    description: "When payment information is added",
    parameters: [],
  },
  {
    name: "AddToWishlist",
    description: "When an item is added to the wishlist",
    parameters: [
      {
        name: "content_id",
        type: "string",
      },
      {
        name: "content_type",
        type: "string",
      },
      {
        name: "currency",
        type: "string",
      },
      {
        name: "value",
        type: "number",
      },
    ],
  },
  {
    name: "Contact",
    description: "When contact information is provided",
    parameters: [
      {
        name: "content_name",
        type: "string",
      },
    ],
  },
  {
    name: "CustomizeProduct",
    description: "When a product is customized",
    parameters: [
      {
        name: "content_id",
        type: "string",
      },
      {
        name: "content_type",
        type: "string",
      },
      {
        name: "currency",
        type: "string",
      },
      {
        name: "value",
        type: "number",
      },
    ],
  },
  {
    name: "Donate",
    description: "When a donation is made",
    parameters: [
      {
        name: "currency",
        type: "string",
      },
      {
        name: "value",
        type: "number",
      },
    ],
  },
  {
    name: "FindLocation",
    description: "When a location is found",
    parameters: [
      {
        name: "content_name",
        type: "string",
      },
    ],
  },
  {
    name: "Schedule",
    description: "When a schedule is created",
    parameters: [
      {
        name: "content_name",
        type: "string",
      },
    ],
  },
  {
    name: "StartTrial",
    description: "When a trial is started",
    parameters: [
      {
        name: "content_name",
        type: "string",
      },
    ],
  },
  {
    name: "SubmitApplication",
    description: "When an application is submitted",
    parameters: [
      {
        name: "content_name",
        type: "string",
      },
    ],
  },
  {
    name: "Subscribe",
    description: "When a subscription is made",
    parameters: [
      {
        name: "currency",
        type: "string",
      },
      {
        name: "value",
        type: "number",
      },
    ],
  },
  {
    name: "TutorialCompletion",
    description: "When a tutorial is completed",
    parameters: [
      {
        name: "content_name",
        type: "string",
      },
    ],
  },
  {
    name: "ViewCategory",
    description: "When a category is viewed",
    parameters: [
      {
        name: "content_name",
        type: "string",
      },
    ],
  },
  { name: "CustomEvent" },
];
