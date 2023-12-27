options({
  resultStreamName: "order_result_Apple",
  $includeLinks: false,
  reorderEvents: false,
  processingLag: 0,
});

fromStream("orderconference")
  .when({
    $init: function () {
      return {
        sum: 0,
        users: {},
        thing: "Apple iPhone 12 Pro 256G",
      };
    },
    "Apple iPhone 12 Pro 256G": function (state, event) {
      state.sum += parseInt(event.data.increment);

      var user = event.metadata.UserName;

      if (!state.users.hasOwnProperty(user)) {
        state.users[user] = event.data.increment;
      } else {
        state.users[user] += event.data.increment;
      }
    },
  })
  .transformBy(function (state) {
    return state;
  })
  .outputState();
