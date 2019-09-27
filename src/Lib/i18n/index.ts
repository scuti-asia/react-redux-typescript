import en from './lang/en';
import vi from './lang/vi';

interface MessagesType {
  [key: string]: any,
}

const messages: MessagesType = {en, vi};

export default {
  messages: messages
}