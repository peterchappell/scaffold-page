var testUsers = [
  {
    "name": {
      "first": "Joe",
      "last": "Blogs"
    },
    "email": "joe@blogs.com",
    "guid": 1
  },
  {
    "name": {
      "first": "Jane",
      "last": "Contrary"
    },
    "email": "jane@contrary.com",
    "guid": 2
  },
  {
    "name": {
      "first": "Sally",
      "last": "Anne"
    },
    "email": "sally@anne.com",
    "guid": 3
  },
  {
    "name": {
      "first": "Willy",
      "last": "Wonka"
    },
    "email": "willy@wonka.com",
    "guid": 4
  }
];

describe('pull from hat - basic', function() {
  var result; // a result that we'll check in each test
  var hat;
  var currentUser = testUsers[0];

  beforeEach(function() {
    hat = testUsers.slice(0); // hat is a clone of users
    result = SS.pullFromHat(currentUser, hat);
  });

  it('should return a result', function() {
    expect(result).to.be.a('object');
  });

  it('should return a giftee in the result', function() {
    expect(result.giftee).to.be.a('object');
    // it's a fair bet it's a user if they have an email property with a string with an @
    expect(result.giftee.email).to.be.a('string');
    expect(result.giftee.email.indexOf('@')).to.be.greaterThan(0);
  });

  it('should return a hat in the result', function() {
    expect(result.hat).to.be.a('array');
  });

  it('should have one less item in the hat after draw', function() {
    expect(result.hat.length).to.equal(testUsers.length - 1);
  });
});

describe('pull from hat - never draw yourself from hat', function() {
  // this test simulates the same user pulling from the hat 4 times
  // (i.e. until the hat is empty)

  var result; // a result that we'll check in each test
  var currentUser = testUsers[0];
  var hat = testUsers.slice(0); // hat is a clone of users

  beforeEach(function() {
    result = SS.pullFromHat(currentUser, hat);
    hat = result.hat;
  });

  describe('1st draw', function() {
    it('should not return current user as giftee', function() {
      expect(result.giftee.guid).to.not.be(currentUser.guid);
    });
  });

  describe('2nd draw', function() {
    it('should not return current user as giftee', function() {
      expect(result.giftee.guid).to.not.be(currentUser.guid);
    });
  });

  describe('3rd draw', function() {
    it('should not return current user as giftee', function() {
      expect(result.giftee.guid).to.not.be(currentUser.guid);
    });
  });

  describe('4th draw', function() {
    it('should return no user', function() {
      expect(result.giftee).to.be(undefined);
    });
  });
});

describe('assign users', function() {

  for (let i = 1; i <= 15; i++) {
    var users, assignedUsersList;

    beforeEach(function() {
      users = testUsers.slice(0);
      assignedUsersList = SS.assignUsers(users);
    })

    describe('round ' + i + ' assignments', function() {

      it('should have no user giving to themselves', function() {
        assignedUsersList.forEach(function(user, index) {
          expect(user.email).to.not.equal(user.givingTo.email);
        });
      });

      it('should have each user being given to once and only once', function() {
        assignedUsersList.forEach(function(user, index) {
          var usersGivingtoThisUser = assignedUsersList.filter(function(givingUser) {
            return givingUser.givingTo.email === user.email;
          });
          expect(usersGivingtoThisUser.length).to.be(1);
        });
      });

    });
  }
});

