This fullstack project is built using Vite and React for the frontend.

The backend uses Node, Express, MongoDB and Mongoose. Authentication on the backend is handled with passportjs. 

The user is able to create characters, search for spells from the DND5e tabletop roleplaying game, and add/delete them from any of their characters' spellbooks. The data for the spells is fetched from the DND 5e API. When added to a spellbook, the data will be stored on a user object in a mongoDB database.