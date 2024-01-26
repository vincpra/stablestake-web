import classNames from 'classnames'
import { calcRem } from '../../utils/styles'
import { SectionProps } from './utils/SectionProps'
import { WEBAPP_LINK, WEBSITE_LINK } from 'components/const/links'
import { NAME } from 'components/const/constants'

export function Disclaimer({ className }: SectionProps) {
  return (
    <div
      className={classNames(
        'container grid justify-between gap-5 bg-blue-light bg-opacity-20 text-white desktop:rounded-md py-8 grid-cols-1 text-center px-12',
        className
      )}
    >
      <p className="text-3xl px-8 py-4 font-bold">Disclaimer</p>
      <p className="" style={{ lineHeight: calcRem(25) }}>
        The information on the {WEBSITE_LINK} and {WEBAPP_LINK} websites (referred to as “Sites”) and communications
        from the {NAME} entity (whether on X, Discord or Telegram) and {NAME} team (referred to as “Team”)
        are for informational purpose only and are not intended to address your particular requirements.
        <br />
        <br />
        In particular, the content and materials available on the Sites do not constitute any form of advice or
        recommendation by the Team, should not be regarded as an offer, solicitation, invitation or recommendation to
        buy or sell investments, securities or any other financial services and is not intended to be relied upon by the
        user in making any specific investment or other decisions. The Team recommends that the users seek independent
        advice from financial advisory before making any such decision. Nothing included in the Sites constitutes an
        offer or solicitation to sell, or distribution of, investments and related services to anyone in any
        jurisdiction.
        <br />
        <br />
        The user should also be aware that the current Protocol parameters may vary at the discretion of the Team. The
        decision process is managed internally by the Team, and the Team reserves the right to communicate or not on
        possible protocol parameters changes, and reserves the right to involve the {NAME} stakeholders to this
        decision process at its discretion. The Token presents a discretionary fee structure that can evolve during the
        life of the Protocol. The governance of the fee structure’s parameters fall in line with that of any other
        parameters of the Protocol and stakeholders agree that it cannot constitute a legitimate reason for litigation.
        <br />
        Furthermore, it is to be understood by stakeholders that the {NAME} proprietary DeFi technology is still in
        development stage and by no means the current implementation should be considered final. The Team does not
        guarantee that the final implementation will be delivered before any specific date, nor that the functionalities
        at any stage of the development reflects the final implementation of the project as the Team imagined it and
        communicated on.
        <br />
        <br />
        The Team does not guarantee that the Site will be secure or free from bugs. Users are responsible for
        configuring their information technology, computer software and platform in order to access the Sites. The Team
        cannot promise that the use of the Sites, or any content taken from the Sites, will not infringe the rights of
        any third party.
      </p>
    </div>
  )
}
