import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

const argv = yargs(hideBin(process.argv)).argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (contact) {
        console.log("Contact găsit:", contact);
      } else {
        console.warn("Contactul nu a fost găsit.");
      }
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log("Contact adăugat:", newContact);
      break;

    case "remove":
      const updatedContacts = await removeContact(id);
      console.log(`Contactul cu id ${id} a fost șters.`);
      console.table(updatedContacts);
      break;

    default:
      console.warn("\x1B[31m Tip de acțiune necunoscut!");
  }
}

invokeAction(argv);
