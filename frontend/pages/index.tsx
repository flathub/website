import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import fetchCollection from "../src/fetchers"
import { APPS_IN_PREVIEW_COUNT } from "../src/env"
import { NextSeo } from "next-seo"
import { Collections } from "../src/types/Collection"
import ApplicationSections from "../src/components/application/Sections"
import Button from "../src/components/Button"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import Image from "../src/components/Image"

export default function Home({
  recentlyUpdated,
  editorsChoiceApps,
  editorsChoiceGames,
  randomApps,
  popular,
}) {
  const { t } = useTranslation()
  return (
    <>
      <NextSeo title={t("home")} description={t("flathub-description")} />
      <div className="main-container">
        <div className="flex justify-between gap-3">
          <div>
            <h1>{t("apps-for-linux-right-here")}</h1>
            <p className="introduction mb-10 max-w-2xl text-lg font-light">
              {t("welcome-to-flathub-index-text")}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://flatpak.org/setup/">
                <Button variant="secondary">{t("quick-setup")}</Button>
              </a>
              <Link href="/apps" passHref>
                <Button variant="secondary">{t("explore")}</Button>
              </Link>
              <Link href="/donate" passHref>
                <Button variant="secondary">
                  {t("donate-to", { project: "Flathub" })}
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              width="400"
              height="300px"
              src="/assets/landing.svg"
              alt=""
            />
          </div>
        </div>

        <ApplicationSections
          popular={popular}
          recentlyUpdated={recentlyUpdated}
          editorsChoiceApps={editorsChoiceApps}
          editorsChoiceGames={editorsChoiceGames}
          randomApps={randomApps}
        ></ApplicationSections>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const recentlyUpdated = await fetchCollection(
    Collections.recentlyUpdated,
    APPS_IN_PREVIEW_COUNT,
  )
  const editorsChoiceApps = await fetchCollection(
    Collections.editorsApps,
    APPS_IN_PREVIEW_COUNT,
  )
  const editorsChoiceGames = await fetchCollection(
    Collections.editorsGames,
    APPS_IN_PREVIEW_COUNT,
  )
  const popular = await fetchCollection(
    Collections.popular,
    APPS_IN_PREVIEW_COUNT,
  )
  const randomApps = await fetchCollection(
    Collections.randomApps,
    APPS_IN_PREVIEW_COUNT,
  )

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      recentlyUpdated,
      editorsChoiceApps,
      editorsChoiceGames,
      popular,
      randomApps,
    },
    revalidate: 3600,
  }
}
