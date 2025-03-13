// Define an array of colors in RGB format
var colors = [
  [33, 123, 254],  // Blue
  [7, 142, 251],   // Light Blue
  [172, 135, 235], // Purple
  [238, 77, 93]    // Pinkish Red
];

// Step variable to control the transition between colors
var step = 0;

// Indices for the color array that determine the transition between colors
var colorIndices = [0, 1, 2, 3];

// The speed at which the gradient transitions between colors
var gradientSpeed = 0.002;

/**
 * Function to update the background gradient dynamically.
 */
function updateGradient() {
  // Select the gradient element
  var gradientElement = document.getElementById("gradient");
  if (!gradientElement) return; // Exit if the element is not found

  // Get the current and next colors for both gradient sides
  var c0_0 = colors[colorIndices[0]]; // Current left color
  var c0_1 = colors[colorIndices[1]]; // Next left color
  var c1_0 = colors[colorIndices[2]]; // Current right color
  var c1_1 = colors[colorIndices[3]]; // Next right color

  // Calculate the transition step (percentage of completion between two colors)
  var istep = 1 - step;

  // Interpolate the RGB values for the left color
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = `rgb(${r1},${g1},${b1})`; // Convert to RGB format

  // Interpolate the RGB values for the right color
  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = `rgb(${r2},${g2},${b2})`; // Convert to RGB format

  // Apply the gradient with a 45-degree angle
  gradientElement.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;

  // Increment the step for smooth transition
  step += gradientSpeed;

  // If the transition is complete (step >= 1), pick new colors
  if (step >= 1) {
    step %= 1; // Reset step to 0

    // Move to the next color in the sequence
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    // Select a new random target color for the left and right side
    colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
  }
}

// Call updateGradient() every 10 milliseconds to create an animated effect
setInterval(updateGradient, 10);
