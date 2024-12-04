import setMainPage from "./set/main-page"
import setSeoTemplates from "./set/seo-templates"

export default async () => {
  await Promise.all([setMainPage(), setSeoTemplates()])
}
