import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, AlertTriangle, Activity, DollarSign, BarChart3, Settings, Play, Pause, RefreshCw } from 'lucide-react';

const NeuralTradingSystem = () => {
  const [activeTab, setActiveTab] = useState('architecture');
  const [isTraining, setIsTraining] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [metrics, setMetrics] = useState({
    sharpe: 0,
    sortino: 0,
    maxDrawdown: 0,
    hitRate: 0,
    totalReturn: 0
  });

  useEffect(() => {
    if (isTraining && epoch < 100) {
      const timer = setTimeout(() => {
        setEpoch(prev => prev + 1);
        setMetrics({
          sharpe: 1.2 + (epoch / 100) * 0.5 + (Math.random() - 0.5) * 0.1,
          sortino: 1.5 + (epoch / 100) * 0.6 + (Math.random() - 0.5) * 0.1,
          maxDrawdown: -8 + (epoch / 100) * 2 + (Math.random() - 0.5) * 0.5,
          hitRate: 52 + (epoch / 100) * 3 + (Math.random() - 0.5) * 0.5,
          totalReturn: 15 + (epoch / 100) * 10 + (Math.random() - 0.5) * 2
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isTraining, epoch]);

  const trainingData = Array.from({ length: 50 }, (_, i) => ({
    epoch: i + 1,
    trainLoss: 0.5 * Math.exp(-i / 20) + 0.05 + Math.random() * 0.02,
    valLoss: 0.5 * Math.exp(-i / 18) + 0.07 + Math.random() * 0.03,
    sharpe: 0.5 + (i / 50) * 1.2 + (Math.random() - 0.5) * 0.1
  }));

  const equityCurve = Array.from({ length: 252 }, (_, i) => {
    const days = i;
    const trend = days * 0.08;
    const volatility = Math.sin(days / 30) * 5;
    const noise = (Math.random() - 0.5) * 3;
    return {
      day: days,
      equity: 100000 + trend * 100 + volatility * 200 + noise * 500,
      benchmark: 100000 + days * 0.04 * 100,
      drawdown: -Math.max(0, Math.sin(days / 60) * 8 + Math.random() * 2)
    };
  });

  const featureImportance = [
    { feature: 'Vol-Adj Momentum', importance: 0.18, type: 'technical' },
    { feature: 'RSI Z-Score', importance: 0.15, type: 'technical' },
    { feature: 'Volume Imbalance', importance: 0.13, type: 'microstructure' },
    { feature: 'Cointegration Spread', importance: 0.11, type: 'statistical' },
    { feature: 'Volatility Regime', importance: 0.10, type: 'regime' },
    { feature: 'News Sentiment', importance: 0.09, type: 'alternative' },
    { feature: 'PCA Factor 1', importance: 0.08, type: 'statistical' },
    { feature: 'Mean Reversion', importance: 0.07, type: 'technical' },
    { feature: 'Bid-Ask Spread', importance: 0.05, type: 'microstructure' },
    { feature: 'Macro Indicator', importance: 0.04, type: 'fundamental' }
  ];

  const riskMetrics = [
    { metric: 'Sharpe Ratio', value: metrics.sharpe.toFixed(2), target: '> 1.5', status: metrics.sharpe > 1.5 ? 'good' : 'warning' },
    { metric: 'Sortino Ratio', value: metrics.sortino.toFixed(2), target: '> 2.0', status: metrics.sortino > 2.0 ? 'good' : 'warning' },
    { metric: 'Max Drawdown', value: `${metrics.maxDrawdown.toFixed(1)}%`, target: '< -10%', status: metrics.maxDrawdown > -10 ? 'good' : 'danger' },
    { metric: 'Hit Rate', value: `${metrics.hitRate.toFixed(1)}%`, target: '> 52%', status: metrics.hitRate > 52 ? 'good' : 'warning' },
    { metric: 'Calmar Ratio', value: (metrics.totalReturn / Math.abs(metrics.maxDrawdown)).toFixed(2), target: '> 2.0', status: 'good' }
  ];

  const calibrationData = Array.from({ length: 10 }, (_, i) => ({
    predicted: i * 10 + 5,
    actual: i * 10 + 5 + (Math.random() - 0.5) * 8,
    count: Math.floor(Math.random() * 100) + 50
  }));

  const renderArchitecture = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-bold text-gray-800 mb-3">System Architecture</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Data Pipeline:</strong> Immutable versioned snapshots, rolling window normalization, zero look-ahead bias</p>
          <p><strong>Feature Engineering:</strong> Multi-timescale (1d, 5d, 20d), z-scored returns, PCA factors, cointegration spreads</p>
          <p><strong>Model Stack:</strong> Ensemble of 5 models (3-layer MLP + TCN + LSTM), dropout 0.3, L2 regularization</p>
          <p><strong>Calibration:</strong> Platt scaling for probability calibration, isotonic regression for tail events</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Network Architecture</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
              <span>Input Layer</span>
              <span className="font-mono text-xs bg-blue-200 px-2 py-1 rounded">128 features</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
              <span>Hidden 1 (ReLU + Dropout)</span>
              <span className="font-mono text-xs bg-blue-200 px-2 py-1 rounded">256 units</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
              <span>Hidden 2 (ReLU + Dropout)</span>
              <span className="font-mono text-xs bg-blue-200 px-2 py-1 rounded">128 units</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
              <span>Hidden 3 (ReLU + Dropout)</span>
              <span className="font-mono text-xs bg-blue-200 px-2 py-1 rounded">64 units</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-green-50 rounded">
              <span>Output (Sigmoid)</span>
              <span className="font-mono text-xs bg-green-200 px-2 py-1 rounded">3 horizons</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Training Configuration</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Optimizer</span>
              <span className="font-semibold">Adam (lr=0.0001)</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Loss Function</span>
              <span className="font-semibold">Weighted BCE</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Batch Size</span>
              <span className="font-semibold">256</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Epochs</span>
              <span className="font-semibold">100 (early stop)</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Validation</span>
              <span className="font-semibold">Walk-forward CV</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Regularization</span>
              <span className="font-semibold">L2=0.001, Dropout=0.3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Feature Importance (Top 10)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={featureImportance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 0.2]} />
            <YAxis dataKey="feature" type="category" width={150} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="importance" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setIsTraining(!isTraining);
              if (!isTraining) setEpoch(0);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded font-semibold ${
              isTraining ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors`}
          >
            {isTraining ? <Pause size={16} /> : <Play size={16} />}
            {isTraining ? 'Stop Training' : 'Start Training'}
          </button>
          <div className="text-sm">
            <span className="text-gray-600">Epoch:</span>
            <span className="font-mono font-semibold ml-2">{epoch}/100</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className={`${isTraining ? 'text-green-500 animate-pulse' : 'text-gray-400'}`} size={20} />
          <span className="text-sm font-semibold">{isTraining ? 'Training...' : 'Idle'}</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Training & Validation Loss</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trainingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epoch" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="trainLoss" stroke="#3b82f6" name="Train Loss" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="valLoss" stroke="#ef4444" name="Val Loss" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Validation Sharpe Ratio Over Training</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trainingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epoch" />
            <YAxis domain={[0, 2]} />
            <Tooltip />
            <Line type="monotone" dataKey="sharpe" stroke="#10b981" name="Sharpe Ratio" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Probability Calibration</h4>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="predicted" name="Predicted Probability" unit="%" domain={[0, 100]} />
            <YAxis dataKey="actual" name="Actual Frequency" unit="%" domain={[0, 100]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Calibration" data={calibrationData} fill="#8b5cf6" />
          </ScatterChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-600 mt-2">Perfect calibration follows diagonal line. Post-training Platt scaling applied.</p>
      </div>
    </div>
  );

  const renderBacktest = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {riskMetrics.map((m, i) => (
          <div key={i} className={`p-4 rounded-lg border-l-4 ${
            m.status === 'good' ? 'bg-green-50 border-green-500' :
            m.status === 'warning' ? 'bg-yellow-50 border-yellow-500' :
            'bg-red-50 border-red-500'
          }`}>
            <div className="text-xs text-gray-600 mb-1">{m.metric}</div>
            <div className="text-2xl font-bold text-gray-800">{m.value}</div>
            <div className="text-xs text-gray-500 mt-1">{m.target}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Equity Curve (Walk-Forward Backtest)</h4>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={equityCurve}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" label={{ value: 'Trading Days', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Equity ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="equity" stroke="#3b82f6" name="Strategy" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="benchmark" stroke="#9ca3af" name="Buy & Hold" strokeWidth={2} dot={false} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Rolling Drawdown (%)</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={equityCurve}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[-15, 0]} />
            <Tooltip />
            <Line type="monotone" dataKey="drawdown" stroke="#ef4444" strokeWidth={2} fill="#fee2e2" fillOpacity={0.3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border-l-4 border-amber-500">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-600" />
          Realistic Execution Constraints Applied
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Bid-Ask Spread:</span>
            <span className="font-semibold ml-2">0.02% - 0.05%</span>
          </div>
          <div>
            <span className="text-gray-600">Slippage Model:</span>
            <span className="font-semibold ml-2">Linear w/ volume</span>
          </div>
          <div>
            <span className="text-gray-600">Commission:</span>
            <span className="font-semibold ml-2">$0.005/share</span>
          </div>
          <div>
            <span className="text-gray-600">Latency:</span>
            <span className="font-semibold ml-2">50-200ms</span>
          </div>
          <div>
            <span className="text-gray-600">Fill Rate:</span>
            <span className="font-semibold ml-2">85% @ market</span>
          </div>
          <div>
            <span className="text-gray-600">Retraining:</span>
            <span className="font-semibold ml-2">Monthly walk-forward</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRiskManagement = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-lg border-l-4 border-red-500">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Risk Control Framework</h3>
        <p className="text-sm text-gray-700">Multi-layer protection: position sizing, portfolio limits, regime detection, circuit breakers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <BarChart3 size={16} className="text-blue-600" />
            Portfolio-Level Limits
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span className="text-gray-700">Max Position Size</span>
              <span className="font-semibold">5% of equity</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span className="text-gray-700">Max Sector Exposure</span>
              <span className="font-semibold">25% of equity</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span className="text-gray-700">Max Correlated Positions</span>
              <span className="font-semibold">ρ &lt; 0.7</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span className="text-gray-700">Max Gross Leverage</span>
              <span className="font-semibold">1.5x</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span className="text-gray-700">Daily Loss Limit</span>
              <span className="font-semibold text-red-600">-2% of equity</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span className="text-gray-700">Max Drawdown Limit</span>
              <span className="font-semibold text-red-600">-15% of peak</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">Regime Detection & Adaptation</h4>
        <div className="grid grid-cols-4 gap-3">
          <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="text-xs text-gray-600 mb-1">Trending Up</div>
            <div className="text-lg font-bold text-green-700">1.2x</div>
            <div className="text-xs text-gray-600">Size multiplier</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="text-xs text-gray-600 mb-1">Mean Reverting</div>
            <div className="text-lg font-bold text-blue-700">1.0x</div>
            <div className="text-xs text-gray-600">Size multiplier</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
            <div className="text-xs text-gray-600 mb-1">High Volatility</div>
            <div className="text-lg font-bold text-yellow-700">0.6x</div>
            <div className="text-xs text-gray-600">Size multiplier</div>
          </div>
          <div className="p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200">
            <div className="text-xs text-gray-600 mb-1">Crisis Mode</div>
            <div className="text-lg font-bold text-red-700">0.0x</div>
            <div className="text-xs text-gray-600">Flatten all</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-700">
          <strong>Regime Indicators:</strong> VIX level, realized volatility, market breadth, correlation structure, trend strength
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-red-300 border-2">
        <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
          <AlertTriangle size={18} />
          Circuit Breakers (Hard Stops)
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded">
            <span className="text-sm font-semibold">Daily Drawdown &gt; 2%</span>
            <span className="px-3 py-1 bg-red-600 text-white text-xs rounded font-bold">HALT TRADING</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 rounded">
            <span className="text-sm font-semibold">Feature Drift Z-Score &gt; 3</span>
            <span className="px-3 py-1 bg-orange-600 text-white text-xs rounded font-bold">PAPER MODE</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 rounded">
            <span className="text-sm font-semibold">Model Confidence &lt; Threshold</span>
            <span className="px-3 py-1 bg-yellow-600 text-white text-xs rounded font-bold">NO NEW TRADES</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 rounded">
            <span className="text-sm font-semibold">Execution Slippage &gt; 3x Expected</span>
            <span className="px-3 py-1 bg-orange-600 text-white text-xs rounded font-bold">REDUCE SIZE</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeployment = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-lg ${
              isLive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors shadow-lg`}
          >
            {isLive ? <Pause size={20} /> : <Play size={20} />}
            {isLive ? 'STOP LIVE TRADING' : 'START LIVE TRADING'}
          </button>
          <div className={`px-4 py-2 rounded-lg font-bold ${
            isLive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {isLive ? '● LIVE' : '○ PAPER MODE'}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className={`${isLive ? 'text-green-500 animate-spin' : 'text-gray-400'}`} size={24} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">System Health</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Data Feed</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-semibold">ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Model Inference</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-semibold">ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Gateway</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-semibold">CONNECTED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Risk Monitor</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-semibold">RUNNING</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Latency (p99)</span>
              <span className="font-semibold text-gray-800">127ms</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Model Monitoring</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Version</span>
              <span className="font-mono text-xs bg-blue-100 px-2 py-1 rounded">v2.3.1-prod</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Retrain</span>
              <span className="font-semibold text-gray-800">2 days ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Feature Drift</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-semibold">Z=0.4 OK</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Prediction Drift</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-semibold">Z=0.6 OK</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Confidence</span>
              <span className="font-semibold text-gray-800">67.3%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Live Performance (Today)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">P&L</span>
              <span className="font-bold text-green-600">+$2,347</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Trades</span>
              <span className="font-semibold text-gray-800">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Win Rate</span>
              <span className="font-semibold text-gray-800">56.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Slippage</span>
              <span className="font-semibold text-gray-800">0.03%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Max Position</span>
              <span className="font-semibold text-gray-800">4.2%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Production Pipeline</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded border-l-4 border-blue-500">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">Data Ingestion & Validation</div>
              <div className="text-xs text-gray-600">Real-time price/volume/news → Schema validation → Immutable versioned storage</div>
            </div>
            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded font-bold">✓ LIVE</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded border-l-4 border-purple-500">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">Feature Engineering</div>
              <div className="text-xs text-gray-600">Rolling normalization → Multi-timescale features → Statistical transforms</div>
            </div>
            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded font-bold">✓ LIVE</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded border-l-4 border-green-500">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">Model Inference</div>
              <div className="text-xs text-gray-600">Ensemble prediction → Probability calibration → Confidence scoring</div>
            </div>
            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded font-bold">✓ LIVE</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded border-l-4 border-orange-500">
            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">Risk & Position Sizing</div>
              <div className="text-xs text-gray-600">Portfolio constraints → Regime detection → Dynamic sizing</div>
            </div>
            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded font-bold">✓ LIVE</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-red-100 rounded border-l-4 border-red-500">
            <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">Order Execution</div>
              <div className="text-xs text-gray-600">Smart routing → Slippage control → Fill confirmation</div>
            </div>
            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded font-bold">✓ LIVE</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded border-l-4 border-gray-500">
            <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold">6</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">Performance Monitoring</div>
              <div className="text-xs text-gray-600">Drift detection → P&L tracking → Alert system</div>
            </div>
            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded font-bold">✓ LIVE</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border-l-4 border-indigo-500">
        <h4 className="font-semibold text-gray-800 mb-4">Deployment Checklist</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Docker containerized w/ version pinning</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>90-day paper trading validation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Feature store with schema validation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Model registry with A/B testing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Automated retraining pipeline</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Drift detection with auto-halt</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Real-time slippage monitoring</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Circuit breaker testing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Disaster recovery runbook</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Regulatory audit trail</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-yellow-300 border-2">
        <h4 className="font-semibold text-yellow-700 mb-3 flex items-center gap-2">
          <AlertTriangle size={18} />
          Critical Monitoring Alerts
        </h4>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-yellow-50 rounded">
            <strong>Model Drift:</strong> Daily KL divergence check on feature distributions. Alert if D_KL &gt; 0.15 for 3 consecutive days.
          </div>
          <div className="p-3 bg-yellow-50 rounded">
            <strong>Prediction Calibration:</strong> Weekly Brier score vs baseline. Alert if degradation &gt; 10%.
          </div>
          <div className="p-3 bg-yellow-50 rounded">
            <strong>Execution Quality:</strong> Track slippage vs model assumption. Alert if 3-sigma deviation.
          </div>
          <div className="p-3 bg-yellow-50 rounded">
            <strong>Performance Decay:</strong> Rolling 30-day Sharpe vs training baseline. Alert if drop &gt; 0.5.
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'architecture', label: 'Architecture', icon: Settings },
    { id: 'training', label: 'Training', icon: Activity },
    { id: 'backtest', label: 'Backtesting', icon: BarChart3 },
    { id: 'risk', label: 'Risk Management', icon: AlertTriangle },
    { id: 'deployment', label: 'Deployment', icon: TrendingUp }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">Neural Network Trading System</h1>
        <p className="text-blue-100">Production-grade ML trading engine with institutional risk controls</p>
        <div className="mt-4 flex gap-4 text-sm">
          <div className="bg-white/20 px-3 py-1 rounded">
            <span className="font-semibold">Walk-Forward CV</span>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded">
            <span className="font-semibold">Realistic Execution</span>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded">
            <span className="font-semibold">Multi-Layer Risk</span>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded">
            <span className="font-semibold">Continuous Monitoring</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-50">
        {activeTab === 'architecture' && renderArchitecture()}
        {activeTab === 'training' && renderTraining()}
        {activeTab === 'backtest' && renderBacktest()}
        {activeTab === 'risk' && renderRiskManagement()}
        {activeTab === 'deployment' && renderDeployment()}
      </div>

      <div className="mt-8 bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-3">Philosophy: Sustainable Statistical Edge</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong className="text-blue-300">Data Integrity:</strong> Immutable versioning, zero look-ahead bias, rolling normalization
          </div>
          <div>
            <strong className="text-green-300">Validation Rigor:</strong> Walk-forward CV, realistic execution, statistical significance testing
          </div>
          <div>
            <strong className="text-yellow-300">Risk First:</strong> Position limits, regime detection, circuit breakers, correlation control
          </div>
          <div>
            <strong className="text-purple-300">Living System:</strong> Drift monitoring, periodic retraining, A/B testing, continuous validation
          </div>
        </div>
        <p className="mt-4 text-gray-300 text-xs italic">
          "The goal isn't predicting every move — it's capturing slightly better-than-random advantages consistently, 
          with low variance and strong discipline. Small edges compound when protected by rigorous risk management."
        </p>
      </div>
    </div>
  );
};

export default NeuralTradingSystem;
            <DollarSign size={16} className="text-green-600" />
            Position Sizing Logic
          </h4>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-gray-50 rounded">
              <div className="font-semibold text-gray-800 mb-1">Confidence-Based</div>
              <code className="text-xs text-gray-600">
                position = base_size * (confidence - threshold) * volatility_adj
              </code>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="font-semibold text-gray-800 mb-1">Kelly Criterion (Fractional)</div>
              <code className="text-xs text-gray-600">
                f = (p * b - q) / b * 0.25
              </code>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="font-semibold text-gray-800 mb-1">ATR-Based Stops</div>
              <code className="text-xs text-gray-600">
                stop_loss = entry_price - (2.5 * ATR_20)
              </code>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
