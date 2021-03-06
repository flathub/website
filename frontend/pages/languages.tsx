import { NextSeo } from "next-seo"
import { Trans, useTranslation } from "next-i18next"
import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { getLanguageFlag, getLanguageName, languages } from "../src/localize"
import Link from "next/link"

const Languages = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo title={t("languages")} description={t("languages-summary")} />
      <div className="my-0 mx-auto max-w-2xl">
        <h1>{t("languages")}</h1>
        <p>{t("languages-description")}</p>
        <ul className="columns-2">
          {languages.sort().map((language) => (
            <li key={language}>
              <Link href={``} locale={`${language}`} passHref>
                <a>
                  {getLanguageFlag(language) + " " + getLanguageName(language)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <p className="pt-8">
          <Trans i18nKey={"common:contribute-languages"}>
            All these translations have been contributed by the community. If
            you want to help translate Flathub, please
            <a
              target="_blank"
              rel="noreferrer"
              href="https://hosted.weblate.org/engage/flathub/"
            >
              join the Flathub translation team
            </a>
            .
          </Trans>
        </p>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}

export default Languages
