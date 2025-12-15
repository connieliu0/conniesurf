#!/bin/bash

# Check if input file is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <input_video> [output_gif] [fps] [scale]"
    echo "Example: $0 input.mp4 output.gif 10 320"
    exit 1
fi

# Set default values
INPUT_VIDEO="$1"
OUTPUT_GIF="${2:-output.gif}"
FPS="${3:-10}"
SCALE="${4:-320}"

# Convert video to gif
ffmpeg -i "$INPUT_VIDEO" -vf "fps=$FPS,scale=$SCALE:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "$OUTPUT_GIF"

echo "Conversion complete: $OUTPUT_GIF"