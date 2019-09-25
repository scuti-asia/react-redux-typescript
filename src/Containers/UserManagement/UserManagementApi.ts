const memberList : any = [
    {
        id: 1,
        name: "Quang Hieu",
        email: "hieu@scuti.asia",
        role: "junior"
    },
    {
        id: 2,
        name: "Duc Loc",
        email: "loc@scuti.asia",
        role: "senior"
    },
    {
        id: 3,
        name: "Hoai Nam",
        email: "nam@scuti.asia",
        role: "junior"
    },
    {
        id: 4,
        name: "Ngoc Diep",
        email: "diep@scuti.asia",
        role: "comtor"
    }
];

export const getAllMembers = (): Promise<string>  => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Object.assign([], memberList));
    }, 1000);
  });
};
