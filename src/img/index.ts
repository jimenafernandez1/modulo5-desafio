export function getImg() {
  return fetch(
    "https://cdn.contentful.com/spaces/2598fwp2jb18/environments/master/entries?access_token=pHfbnErEuvhj3p7B0lS2ASnBiORY_2pnQgDE689VA6Y")
    .then((r) => {
      return r.json()
    }).then((data) => {

      const links = {
        fondo: data.includes["Asset"][4].fields.file.url,
        ganaste: data.includes["Asset"][6].fields.file.url,
        piedra: data.includes["Asset"][8].fields.file.url,
        titulo: data.includes["Asset"][12].fields.file.url,
        papel: data.includes["Asset"][16].fields.file.url,
        instructions: data.includes["Asset"][21].fields.file.url,
        tijera: data.includes["Asset"][22].fields.file.url,
        perdiste: data.includes["Asset"][23].fields.file.url,
      }
      return links;
    }
  )
}