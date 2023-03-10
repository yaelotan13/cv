import { createMachine, assign } from "xstate";

const actions = [
  {
    action: "Getting in touch with Yael ðŽ",
    subActions: [
      {
        action: "Linkedin account",
        response: (
          <a
            href="https://www.linkedin.com/in/yael-lotan-030266132/"
            target="_blank"
            rel="noreferrer"
          >
            Click here
          </a>
        ),
      },
      {
        action: "CV",
        response: (
          <a href="/Yael_Lotan_CV.pdf" download="Yael_Lotan_CV">
            Click to download
          </a>
        ),
      },
      { action: "Email", response: "yaelotan19@gmail.com" },
      { action: "Phone number", response: "054-6323450" },
    ],
  },
  {
    action: "Beach volleyball tips ð",
    subActions: [
      {
        action: "Attacking",
        response: "Wait to see the set before starting your approach ðĪð―",
      },
      {
        action: "Defense",
        response:
          "Don't forget to have your hands ready to go up and protect your money maker ðĻâðĶē",
      },
      {
        action: "Serving",
        response:
          "After you hit the ball try to move you hand back as fast as possible as if the ball burning ðĨ",
      },
      {
        action: "Setting",
        response:
          "Turn your body entirely towards the target you aim to set ðĶ",
      },
      {
        action: "Reception",
        response:
          "Set your platform as early as possible without swinging you hands to the ball ð",
      },
    ],
  },
  {
    action: "Find an holiday destination ðŦ",
    subActions: [
      {
        action: "Urban",
        response: [
          "London! ðĄ",
          "Madrid! ðĶŽ",
          "Paris! ðĨ",
          "Rome! ð",
          "San Francisco! ð",
          "Berlin! ðŠĐ",
          "Boston! ðŋ",
        ],
      },
      {
        action: "Relax",
        response: [
          "Thailand! ð",
          "Zanzibar! ð",
          "Mauritius! âą",
          "Seychelles! ðđ",
        ],
      },
      {
        action: "Explore",
        response: [
          "Vietnam! ðŋ",
          "New york! ð―",
          "New Zealand! ð",
          "Marocco! ð",
          "Japan! ð",
          "China! ðē",
        ],
      },
      {
        action: "Eat",
        response: [
          "Italy! ð",
          "Japan! ðą",
          "Spain! ðĨ",
          "Swiss! ð§",
          "Germany! ð­",
          "Mexico! ðŪ",
          "Greece! ðĪ",
        ],
      },
    ],
  },
  {
    action: "Decide on lunch ð―",
    subActions: [
      {
        action: "Asian",
        response: [
          "Dim sum ðĨ",
          "Sushi ðĢ",
          "Curry ð",
          "Nodels ðĨĄ",
          "Ramen ð",
          "",
        ],
      },
      {
        action: "Surprise me",
        response: [
          "Burrito ðŊ",
          "Sandwich ðĨŠ",
          "Ramen ð",
          "Dim sum ðĨ",
          "Sushi ðĢ",
          "Falafel ð§",
          "Taco ðŪ",
          "Spaghetti ð",
        ],
      },
      {
        action: "Karnivor vibe",
        response: ["Burger ð", "Rotisserie ð", "Steak ðĨĐ"],
      },
      {
        action: "Veggy",
        response: [
          "Falafel ð§",
          "Salad ðĨ",
          "Veggy ramen ð",
          "Pizza ð",
          "Veggy bagel ðĨŊ",
          "Veggy sushi ðĢ",
        ],
      },
    ],
  },
];

export default createMachine(
  {
    id: "chat-machine",
    initial: "waitForMainAction",
    predictableActionArguments: true,
    context: {
      actions,
      conversations: [{}],
    },
    states: {
      waitForMainAction: {
        on: {
          ACTION_SELECTED: {
            actions: "addBotResponseForAction",
            target: "waitForSubAction",
          },
        },
      },
      waitForSubAction: {
        on: {
          SUB_ACTION_SELECTED: {
            actions: ["addBotResponseForSubAction", "pushNewConversation"],
            target: "waitForMainAction",
          },
        },
      },
    },
  },
  {
    actions: {
      addBotResponseForAction: assign((context, event) => {
        const updatedConversations = [...context.conversations];
        const updatedLastConversation = {
          ...updatedConversations[updatedConversations.length - 1],
        };

        updatedLastConversation.action = event.value;
        updatedConversations[updatedConversations.length - 1] =
          updatedLastConversation;

        return {
          conversations: updatedConversations,
        };
      }),
      addBotResponseForSubAction: assign((context, event) => {
        const updatedConversations = [...context.conversations];
        const updatedLastConversation = {
          ...updatedConversations[updatedConversations.length - 1],
        };

        const subAction = { ...event.value };
        if (Array.isArray(event.value.response)) {
          const randomIndex = Math.floor(
            Math.random() * event.value.response.length
          );
          subAction.response = event.value.response[randomIndex];
        }

        updatedLastConversation.subAction = subAction;
        updatedConversations[updatedConversations.length - 1] =
          updatedLastConversation;

        return {
          conversations: updatedConversations,
        };
      }),
      pushNewConversation: assign((context) => {
        const updatedConversations = [...context.conversations];
        updatedConversations.push({});

        return {
          conversations: updatedConversations,
        };
      }),
    },
  }
);
