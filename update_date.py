import os
import fnmatch

def replace_string_in_file(file_path, old_string, new_string):
    with open(file_path, 'r') as file:
        filedata = file.read()
    filedata = filedata.replace(old_string, new_string)
    with open(file_path, 'w') as file:
        file.write(filedata)

def find_replace(directory, find, replace):
    for path, dirs, files in os.walk(os.path.abspath(directory)):
        for filename in fnmatch.filter(files, "*.html"):
            filepath = os.path.join(path, filename)
            replace_string_in_file(filepath, find, replace)

# usage
find_replace('.', 'updated 02.18.2024', 'updated 02.17.2024')