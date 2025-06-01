interface ChatGPTResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface ImageGenerationResponse {
  data: Array<{
    url: string;
    b64_json?: string;
  }>;
}

export const generateComicImage = async (description: string, title: string, imageBase64?: string): Promise<string> => {
  try {
    // Create a detailed prompt for comic-style image generation
    const prompt = `Create a comic book style illustration based on the attached photo and this description: "${description}" with the title "${title}". 
    Style: Comic book art, vibrant colors, bold outlines, dynamic composition, speech bubbles if needed, action-packed scene.
    Make it look like a professional comic book panel with dramatic lighting and engaging character poses. try to keep the comics charecters as  resemble as possible to the personas in the original picture.
    divide each comics page into (at least) 4 sections and add at least 1 text bubble. 
    ${imageBase64 ? 'Use the provided reference image as inspiration for the scene composition and characters.' : ''}`; 

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer <openAI key>`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'vivid'
      })
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data: ImageGenerationResponse = await response.json();
    return data.data[0]?.url || '';
  } catch (error) {
    console.error('Error generating comic image:', error);
    // Return a fallback placeholder image URL
    return `https://via.placeholder.com/400x400/FFE4B5/8B4513?text=${encodeURIComponent(title || 'Comic Panel')}`;
  }
};

// Keep the story generation function as backup
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
        'Authorization': `Bearer sk-proj-AnLBOzgPGJKIu3jUunIca3qPU3tNYoKuYnhhayqsJfTKYAHE9dT0uvXP9ANKqr84mNVd94fyodT3BlbkFJ0edsLoAcRZzONRANvgKs14OUs6iWQ6WV55OAALM6qJIL-NOlp0DQkQCwdaIs3dMWr28o4wzbP4A`
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
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = error => reject(error);
  });
};
