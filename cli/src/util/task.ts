import ora from 'ora'

export default async function task<T>(name: string, task: Promise<T>): Promise<Awaited<T>> {
  const spinner = ora(name).start()
  const res = await task
  spinner.succeed()
  return res
}