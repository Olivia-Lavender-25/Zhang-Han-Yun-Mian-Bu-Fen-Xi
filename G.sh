#!/bin/bash

# Ensure an argument is passed to the script
if [ -z "$1" ]; then
    echo "Usage: ./G.sh <commit-message>"
    exit 1
fi

# Store the first argument as the commit message
commit_message="$1"

# Execute git commands

#!/bin/bash



# Get a list of files that are modified or newly created, excluding deletions
files_to_add=$(git status --porcelain | grep -E '^(A| M|\?\?)' | cut -c 4-)


# Calculate the total size of those files
total_size=$(echo "$files_to_add" | xargs du -ch | grep total$ | cut -f1)

echo "Total size of modified or newly created files: $total_size"
[ "$1" == "--getsize" ] && exit 0



# echo -e "$files_to_add"

# Check if there are files to add
if [ -z "$files_to_add" ]; then
    echo "No files to commit"
    exit 0
fi

string="G.sh
\"商业博弈 Search 1.json\""



# Decode chinese characters, emoji back to original
files_to_add=$(printf %b "$files_to_add\n")
# Split string by newline into an array
IFS=$'\n' read -rd '' -a files <<<"$files_to_add"

echo $files_to_add

# Print the array to verify
for file in "${files[@]}"; do
    # original_string='This is a "quoted" string.'
    # escaped_string=$(printf '%q' "$file")
    if [[ "$file" =~ ^\".*\"$ ]]; then
        # If it starts and ends with quotes, slice the first and last characters
        file="${file:1:-1}"
    else
        # Otherwise, keep the original string
        file="$file"
    fi

    echo $file

    git add "${file}"
done

commit_message="$1"

# Ensure an argument is passed to the script
if [ -z "$1" ]; then
    echo "Usage: ./G.sh <commit-message>"
    exit 1
fi

# Store the first argument as the commit message
commit_message="$1"
git commit --quiet -m "$commit_message"
git push origin main


# !!! Important - convert encode back (decode)
# https://stackoverflow.com/questions/73889449/convert-a-character-from-and-to-its-decimal-binary-octal-or-hexadecimal-repre
# Section: Convert a character from and to its octal representation

# code="G.sh
# README.md
# \345\225\206\344\270\232\345\215\232\345\274\210 Search 1.json"
# code=$(printf %b "$code\n")
# echo $code