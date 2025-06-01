
interface ChatGPTResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const generateComicStory = async (description: string, title: string, imageBase64?: string): Promise<string> => {
  try {
    const messages = [
      {
        role: "system",
        content: "You are a creative comic book writer. Generate a short, engaging comic book story panel based on the user's description and title. Keep it to 2-3 sentences, make it fun and comic-style with action words and expressions. Focus on visual storytelling."
      },
      {
        role: "user",
        content: `Create a comic book story panel for a page titled "${title}" with this description: "${description}". Make it exciting and visual, like something you'd read in a comic book bubble or caption.`
      }
    ];

    // If we have an image, add it to the message (for future vision support)
    if (imageBase64) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: "Here's the image for this comic panel:"
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${imageBase64}`
            }
          }
        ]
      } as any);
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 150,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data: ChatGPTResponse = await response.json();
    return data.choices[0]?.message?.content || 'An exciting comic adventure unfolds!';
  } catch (error) {
    console.error('Error generating comic story:', error);
    return `In this exciting moment titled "${title}", ${description}. The adventure continues as our hero faces new challenges and discovers amazing things along the way!`;
  }
};

// Helper function to convert File to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      // Remove the data:image/jpeg;base64, prefix
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = error => reject(error);
  });
};
