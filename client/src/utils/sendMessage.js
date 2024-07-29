import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const sendMessage = async (recipientId, text) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Not authenticated");

        await addDoc(collection(db, "messages"), { 
            sender: user.uid,
            recipient: recipientId,
            text: text,
            timestamp: serverTimestamp(),
        });
        console.log("Message sent!");
    } catch (error) {
        console.log("Error sending message:", error);
    }
};

export default sendMessage;
