const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
  Query: {
    //Users resolvers
    users: () => {
      return UserList;
    },
    user: (_, args) => {
      const id = args.id;
      return UserList.find((ele) => Number(ele.id) === Number(id));
    },

    //Movie resolvers
    movies: () => {
      return MovieList;
    },
    movie: (_, args) => {
      const name = args.name;
      return MovieList.find((ele) => ele.name.includes(name));
    },
  },
  User: {
    favoriteMovies: () => {
      return MovieList.filter(
        (mov) => mov.yearOfPublication >= 2000 && mov.yearOfPublication <= 2010
      );
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUserName: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id == id) {
          user.username = newUsername;
          userUpdated = user;
        }
      });

      return userUpdated;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
       _.remove(UserList,(user) => user.id === Number(id))
      return null;
    },
  },
};

module.exports = { resolvers };
