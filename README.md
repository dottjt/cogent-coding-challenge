# Cogent Take Home Test

Hello!

My name is Julius. Thank you for looking into my code! I spent a few days building it and I hope you think it's awesome. :grin:

I tried a few different approaches to varying success, but in the end the image comparison algorithm consistently proved to be the most significant bottleneck in terms of speed, so I focused on making all the images as simple as possible to parse and I'm very happy with the result. The application now runs very smoothly.

I also tried my best to adopt an iterative TDD approach for most of the application, but the actual comparison algorithm proved too complex to attempt given the complexity/uncertainty of the solution (I ended up rewriting it a few times). I still wrote tests to prove that it worked, but TDD is definitely something I would like to improve upon.

I would also like to comment that this exercise is definitely not a 3 - 4 hour coding challenge. It's at least double or triple that.

## Output

```


```

## Considerations

### What if this same solution was used on a really large set of photos? What if it was a thousand photos? Or tens of thousands?

- The algorithm has been optimised around speed and allows for extremely fast comparison of images. It does a number of things to facilitate the process, such as standardise the images down to 30px x 30px, as well as apply greyscaling to the images.

### What if this was a three-way merge, with triplicates? Does your solution account for this?

- Yes, the solution runs a complete total of all images within the set.

### Some of these files may have had their filename changed.

- This is irrespective, because filename does not prove image contents, nor would this kind of check/optimisation improve upon finding all possible images which are the same.

### Some of these may have only their extension changed.

- This is irrespective, because extension does not prove image contents, nor would this kind of check/optimisation improve upon finding all possible images which are the same.

## Application

Here's the gist of how the application works.

- Pass in folder of images for application to process.
- Process and crop all images into a `./tmp` folder (greyscale, 30px x 30px) so that they're all quick n' easy to compare.
- Compare them pixel by pixel using a quick pixel matching library.
- Display the results to the user.

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
  - `npm start` with relevant arguments

Here are some examples:
  - `npm start ./images`

To run the tests, please enter:
  - `npm test`
  - You may need to install watchman onto your machine. I know I had issues with it for whatever reason i.e. `brew install watchman` (assuming you have brew installed)

## Initial Assumptions

- INSTRUCTION: `finds files which have exactly the same contents` - I assume by "contents", the brief is referring to the actual image itself, not file name.
- The only way to correctly prove if two images are the same is to check if two images have the same contents.
- There are some potential hacks which might be able to find a match faster, based on things like similar file names etc.

## Future Improvements

- I'm sure you could go smaller than 30px (maybe it's actually too small?), but I have no idea what the threshold is to prove that two images are the same.
- Technically you wouldn't have to create any actual images within a `./tmp` and you could just render the image information solely into a buffer, but I wanted to render it for testing reasons.
- There's some legacy stuff in there like adding folders into the file array, because I thought I could use it for some optimisations - but I didn't really feel it was necessary in the end.
- The tests could be more comprehensive and better formatted.

## Process

Here's how I went about this coding exercise.

- Create initial codebase.
- Figure out which libraries I need to use + initial assumptions + application logic
  - `fs` - file
  - `file-type` - checks if the image file is in fact an image.
  - `looks-same` - compare the contents of two different images. (lol ended up going with pixelmatch instead because looks-same was too slow)
- Spec out how the application should be formatted.
- Write each section of the application with tests.

## Working Notes

Here's a working model of how the application will function (this model will evolve), at least how I think it might work.

- Validate the command line arguments
- Gather a complete list of all the images with their file paths in an array. Sort them into:
  - { filepath: string, filename: string, isFolder: boolean }
- Do some initial checks based on file similarities:
  - Does a folder name share the same part of another folder name?
  - Does a folder share the same part of another image file name?
  - Does an image share the same contents of another image?
- Go through all the images and basically check them one by one.

- There will be an array which will be mutated throughout the course of the checks which items have already been iterated?
- Do I also want a huge matrix which has accounted for all possibilities? Might be beyond the scope of this application.
