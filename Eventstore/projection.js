options({
  resultStreamName: "order_result",
  $includeLinks: false,
  reorderEvents: false,
  processingLag: 0,
});

fromStream("orderconference")
  .when({
    $init: function () {
      return {
        sum: 0,
        userA: 0,
        userB: 0,
        thing: "order-UFO",
      };
    },
    "order-UFO": function (state, event) {
<<<<<<< HEAD
      state.sum += event.data.increment;
      var user = event.metadata.name;

      if (user === "userA") state.userA += event.data.increment;
      else state.userB += event.data.increment;
=======
      state.sum = parseInt(state.sum) + parseInt(event.data.increment);
      var user = event.metadata.name;

      if (user === "userA") state.userA += parseInt(event.data.increment);
      else state.userB += parseInt(event.data.increment);
>>>>>>> 3b3155418d8bf7dabe112cbc81f8d6e3e984c5f9
    },
  })
  .transformBy(function (state) {
    return state;
  })
  .outputState();
