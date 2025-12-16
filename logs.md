
# 16.12.2025
Now InputField.handleInput() works for around the 0.5ms. 
It is so slow, because algorithm every time deletes all the elements
of visible text and pushes new with new styles. I tried to do that without 
deleting, just to build the text once, before the typing, and edit it via 
querySelector() access to the particular symbol, and... It decreased the 
handleInput() 5 times! ~0.10ms.