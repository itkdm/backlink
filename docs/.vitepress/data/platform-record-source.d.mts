export type PlatformRecordSource = {
  file: string
  source: string
  frontmatter: Record<string, unknown>
}

export function normalizePlatformDomain(value: string): string
export function readPlatformRecordSources(recordsDirectory?: string): PlatformRecordSource[]
