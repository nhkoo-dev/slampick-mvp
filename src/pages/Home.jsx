import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Clock,
  Megaphone,
  Search,
  Sliders,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import Header from '../components/common/Header';
import Reveal from '../components/common/Reveal';
import DashboardMockup from '../components/dashboard/DashboardMockup';
import Card from '../components/common/Card';
import { ROUTES } from '../config/constants';

const FEATURES = [
  {
    icon: Search,
    title: '인플루언서 검색',
    description:
      '국가, 카테고리, 팔로워 수 등 다양한 조건으로 원하는 인플루언서를 빠르게 찾아보세요.',
  },
  {
    icon: Sliders,
    title: '다양한 필터',
    description:
      '지역, 티어, 콘텐츠 축 등 세분화된 필터로 조건에 맞는 인플루언서만 골라내세요.',
  },
  {
    icon: Megaphone,
    title: '캠페인 관리',
    description: '진행 중인 캠페인과 협업 현황을 한 곳에서 효율적으로 관리하세요.',
  },
  {
    icon: TrendingUp,
    title: '실시간 데이터',
    description: '매일 업데이트되는 실시간 데이터로 가장 최신의 인플루언서 정보를 확인하세요.',
  },
];

const WHY_SLAMPICK = [
  {
    icon: Clock,
    title: '시간 절약',
    description: '수작업으로 몇 시간씩 걸리던 인플루언서 리서치를 몇 분 만에 끝내세요.',
  },
  {
    icon: BarChart3,
    title: '데이터 기반 의사결정',
    description: '감이 아닌 데이터를 기반으로 더 확실한 캠페인 전략을 세우세요.',
  },
  {
    icon: Target,
    title: '효율적인 캠페인 운영',
    description: '탐색부터 관리까지, 하나의 플랫폼에서 캠페인을 매끄럽게 운영하세요.',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-x-hidden bg-surface">
      <Header minimal />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1c1147] via-[#3b1f9e] to-[#4733FF]">
        <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 animate-[float-slow_9s_ease-in-out_infinite] rounded-full bg-fuchsia-400/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-10 h-[28rem] w-[28rem] animate-[float-slow_11s_ease-in-out_infinite] rounded-full bg-violet-400/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 animate-[float-slow_13s_ease-in-out_infinite] rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
              AI 기반 인플루언서 마케팅 플랫폼
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-text-inverse sm:text-5xl lg:text-[3.4rem]">
              인플루언서 마케팅을
              <br />
              <span className="bg-gradient-to-r from-fuchsia-300 via-violet-200 to-white bg-clip-text text-transparent">
                더 쉽고 빠르게
              </span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
              브랜드가 원하는 인플루언서를 탐색하고, 캠페인을 관리하는 모든
              과정을 하나의 플랫폼에서 끝내세요.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate(ROUTES.LOGIN)}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-primary px-8 py-3.5 text-sm font-semibold text-text-inverse shadow-[0_10px_30px_rgba(217,70,239,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(217,70,239,0.5)]"
              >
                로그인
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={150} className="relative">
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-white/5 blur-2xl" />
            <DashboardMockup />

            <div className="absolute -bottom-12 -left-10 hidden animate-[float_6s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 shadow-2xl backdrop-blur-xl sm:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                <TrendingUp className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-text-inverse">이번 주 +128 매칭</p>
                <p className="text-[11px] text-white/60">실시간 업데이트 중</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <Reveal as="section" className="mx-auto max-w-4xl px-6 py-28 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          About
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-text sm:text-3xl">
          하나의 플랫폼, 모든 인플루언서 마케팅
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">
          SlamPick은 브랜드가 인플루언서를 쉽게 탐색하고, 국가, 카테고리, 팔로워
          수 등의 조건으로 검색하며, 
          <br />
          캠페인을 효율적으로 운영할 수 있도록
          도와주는 AI 기반 인플루언서 마케팅 플랫폼입니다.
        </p>
      </Reveal>

      {/* Features */}
      <section className="bg-gradient-to-b from-background to-surface py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Features
            </span>
            <h2 className="mt-4 text-2xl font-extrabold text-text sm:text-3xl">
              필요한 기능은 다 있습니다
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 100}>
                <Card
                  glass
                  hover
                  className="group h-full p-7 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_24px_48px_rgba(71,51,255,0.16)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 text-text-inverse shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-text">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why SlamPick */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Why SlamPick
          </span>
          <h2 className="mt-4 text-2xl font-extrabold text-text sm:text-3xl">
            선택해야 할 이유
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {WHY_SLAMPICK.map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <Card
                hover
                className="group h-full p-8 text-center hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(71,51,255,0.16)]"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-text-inverse">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-text">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-28">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1c1147] via-[#3b1f9e] to-[#4733FF] px-6 py-20 text-center shadow-[0_30px_80px_rgba(71,51,255,0.35)]">
          <div className="pointer-events-none absolute -top-20 -left-10 h-72 w-72 rounded-full bg-fuchsia-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-violet-400/30 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl font-extrabold text-text-inverse sm:text-3xl">
              지금 시작해보세요
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/70">
              몇 분이면 충분합니다. 
              <br />
              SlamPick과 함께 인플루언서 마케팅을 더 쉽고 빠르게 시작하세요.
            </p>
            <button
              onClick={() => navigate(ROUTES.SIGNUP)}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-surface px-8 py-3.5 text-sm font-semibold text-primary shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            >
              회원가입
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
