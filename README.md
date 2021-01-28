# Cogent Take Home Test

Hello!

My name is Julius. Thank you for looking into my code! I spent a few hours building it and I hope you think it's awesome. :grin:

## Structure

Here are the main folders:
  - `images` - image files
  - `src` - application source code
  - `tests` - application test code

## Setup

In the root directory run:
  - `npm install` - this will install all the Node.js libraries
  - Please install Node.js onto your machine if you have not already i.e. `https://nodejs.org/en/download/`

## Running

To run the application, please enter:
  - `npm start`

To run the tests, please enter:
  - `npm test`
  - You may need to install watchman onto your machine. I know I had issues with it for whatever reason i.e. `brew install watchman` (assuming you have brew installed)

## Initial Assumptions

- INSTRUCTION: `finds files which have exactly the same contents` - I assume by "contents", the brief is referring to the actual image itself, not file name.
- The only way to correctly prove if two images are the same is to check if two images have the same contents.
- There are some potential hacks which might be able to find a match faster, based on things like similar file names etc.

## Future Improvements

-

## Process

Here's how I went about this coding exercise.

- Create initial codebase.
- Figure out which libraries I need to use + initial assumptions + application logic
  - `fs` - file
  - `file-type` - checks if the image file is in fact an image.
  - `looks-same` - compare the contents of two different images.
- Spec out how the application should be formatted.


## Logic

Here's a working model of how the application will function (this model will evolve), at least how I think it might work.

- Validate the command line arguments
- Gather a complete list of all the images with their file paths in an array. Sort them into:
  - { filepath: string, filename: string, isFolder: boolean }
- Do some initial checks based on file similarities:
  - Does a folder name share the same part of another folder name?
  - Does a folder share the same part of another image file name?
  - Does an image share the same contents of another image?

- There will be an array which will be mutated throughout the course of the checks which items have already been iterated?
- Do I also want a huge matrix which has accounted for all possibilities? Might be beyond the scope of this application.
