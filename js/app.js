$(function () {
  $('#search').submit((event) => {
    event.preventDefault()
    console.log('form being submitted')

    const query = $('#query').val()
    console.log(query)

    $('#results-table tbody').html('')
    $('#query').val('')

    search(query)
  })

  function displayResults (gifs) {
    console.log(gifs)
    gifs.forEach((gif) => {
      $('#results-table tbody').append(
        `<tr>
          <td>${gif.title}</td>
          <td><img src="${gif.images.fixed_height.url}"></td>
          <td>${gif.rating}</td>
          <td><a href="${gif.url}"> link </a></td>
        </tr>`
      )
    })
  }

  async function search (searchTerm) {
    try {
      const endpoint = 'https://api.giphy.com/v1/gifs/search'
      const apiKey = process.env.GIPHY_API_KEY

      const response =
        await axios.get(endpoint, {
          params: {
            q: searchTerm,
            api_key: apiKey,
            limit: 30
          }
        })

      console.log(response.data.data)
      displayResults(response.data.data)
    } catch (error) {
      console.log(error)
    }

    // $.ajax({
    //   url: url,
    //   type: 'GET',
    //   data: { q: searchTerm, limit: 50, api_key: apiKey }
    // })
    // .done((response) => {
    //   // execute this function if request is successful
    //   console.log(response)
    //   displayResults(response.data)
    // })
    // .fail(() => {
    //   // execute this function if request fails
    //   alert('error occurred')
    // })
  }
})
