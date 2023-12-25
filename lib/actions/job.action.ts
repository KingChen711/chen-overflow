'use server'

import { GetAllJobsParams } from './shared.types'

export async function getJobFilters() {
  const countries = await fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching data:', error)
    })

  return countries
    .map((country: any) => ({
      name: country.name.common,
      value: country.name.common.toLowerCase()
    }))
    .sort((a: any, b: any) => a.name.localeCompare(b.name)) as { name: string; value: string }[]
}

export async function getAllJobs(params: GetAllJobsParams) {
  const { filter, page = 1, searchQuery = 'Software' } = params

  const query = new URLSearchParams({
    query: `${searchQuery}${filter ? ' in' + filter : ''}`,
    page: page.toString(),
    num_pages: '1'
  })

  console.log({ q: `${searchQuery + ' Software'}${filter ? ' in ' + filter : ''}` })

  const url = `https://jsearch.p.rapidapi.com/search?${query}`

  const jobs = await fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '88738c8398msh53c868ef94b6e17p1a9fe2jsn22543a9d5b32',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  })
    .then((response) => response.json())
    .then((res) => res.data)

  return { jobs }
}
