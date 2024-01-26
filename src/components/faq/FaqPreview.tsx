import { SectionTitle } from '../sections/utils/SectionTitle'
import { Question } from './utils/Question'
import { PANCAKESWAP_LINK, TELEGRAM_LINK } from 'components/const/links'
import Link from 'next/link'
import { calcRem } from 'utils/styles'
import classNames from 'classnames'

export function FaqPreview() {
  return (
    <div className="w-full flex-col justify-between mt-16 container text-white">
      {/* <Question question="Frequently Asked Questions" isTitle={true}> */}
      <BasicQuestions />
      <div className="w-full flex mt-8">
        <div className={classNames('text-justify')} style={{ fontSize: calcRem(16) }}>
          Encountering any issue? Head to our{' '}
          <Link href={TELEGRAM_LINK} passHref>
            <a className="font-bold text-purple-discord" target="_blank">
              Telegram
            </a>
          </Link>
          &nbsp;group. A moderator or team member will answer your question or help you solve your issue.
        </div>
      </div>
    </div>
  )
}

const BasicQuestions = () => {
  return (
    <div className="w-full flex justify-center mt-8">
      <div
        className={classNames(
          'flex flex-wrap justify-between w-full laptop:mt-10 tablet:mb-10'
        )}
      >
        <SectionTitle>Most common questions</SectionTitle>
        <div className={'divide-gray-light divide-opacity-50 h-full w-full mx-auto'}>
          <Question question="Question?">
            <strong>Answer</strong>
          </Question>
        </div>
      </div>
    </div>
  )
}
