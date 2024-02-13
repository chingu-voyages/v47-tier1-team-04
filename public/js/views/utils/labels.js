const label = (priority) => {
  console.log(priority)
  switch (priority) {
    case 3:
      console.log(priority)
      return `<a href="#" class="btn btn-lite btn-blue">Low</a>`;

    case 2:
      return `<a href="#" class="btn btn-lite btn-orange">Med</a>`;

    case 1:
      return `<a href="#" class="btn btn-lite btn-red">High</a>`;

    default:
      return `<a href="#" class="btn btn-lite btn-blue">Low</a>`;
  }
};

export default label
